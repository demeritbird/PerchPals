import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../utils/helpers';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { ServerReturnStatus } from 'src/utils/types';

export interface SuccessReponse {
  status: Extract<'success', ServerReturnStatus>;
  token?: string;
  data: {
    [key: string]: any;
  };
}
export interface ErrorResponse {
  status: Extract<'error' | 'fail', ServerReturnStatus>;
  error: {
    statusCode: number;
    status: 'error' | 'fail';
    isOperational: 'true' | 'false';
  };
  message: string;
  stack?: string;
}

type AxiosRequest = {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  requestBody?: {
    [key: string]: any;
  };
};
type AxiosResponse = SuccessReponse | ErrorResponse;

export function isResponseType<T extends ServerReturnStatus>(
  res: AxiosResponse,
  status: T
): res is Extract<AxiosResponse, { status: T }> {
  return res.status === status;
}

function useAxios() {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();

  const { authUser } = useAuth();
  const refresh = useRefreshToken();

  async function axiosRequest(requestObj: AxiosRequest): Promise<void> {
    const { method, url, requestBody = {} } = requestObj;
    const isFormData = requestBody instanceof FormData;

    try {
      setError(null);
      setLoading(true);

      const controller: AbortController = new AbortController();
      setController(controller);

      axiosInstance.defaults.withCredentials = true;

      let res;
      if (isFormData) {
        axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
        res = await axiosInstance[method](url, requestBody, { signal: controller.signal });
      } else {
        axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        res = await axiosInstance[method](url, {
          ...requestBody,
          signal: controller.signal,
        });
      }

      setResponse(res.data);
    } catch (error) {
      let message;
      if (error instanceof AxiosError && error.response?.data) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /**
     * @desc Whenever a request is made,
     * - add an Authorisation Header for Cookies
     */
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${authUser?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /**
     * @desc Whenever access token fails, (once per request)
     * - refresh User's accessToken
     * - reattempt previous Axios call
     */
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        let prevRequest = error?.config;
        let errResponse = error?.response;

        if (errResponse.status === 403 && !prevRequest.sent) {
          error.config.sent = true;

          const newAccessToken: string | null = await refresh();
          if (!newAccessToken) return Promise.reject(error);

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [authUser, refresh]);

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return {
    request: axiosRequest,
    response,
    error,
    setError,
    isLoading: loading,
  };
}

export default useAxios;
