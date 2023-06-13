import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../utils/helpers';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

interface AxiosRequest {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  requestBody?: {
    [key: string]: any;
  };
}
interface AxiosResponse {
  [key: string]: any;
}

function useAxios() {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();

  const { authUser } = useAuth();
  const refresh = useRefreshToken();

  async function axiosRequest(requestObj: AxiosRequest): Promise<void> {
    const { method, url, requestBody = {} } = requestObj;
    const isFormData = requestBody instanceof FormData;

    try {
      setError('');
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
    response,
    error,
    isError: error as unknown as boolean,
    isLoading: loading,
    axiosRequest,
  };
}

export default useAxios;
