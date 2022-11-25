import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../utils/helpers';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

interface ConfigAxios {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  requestBody?: {
    [key: string]: any;
  };
}
interface ResponseAxios {
  [key: string]: any;
}

function useAxios() {
  const [response, setResponse] = useState<ResponseAxios | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();

  const { authUser } = useAuth();
  const refresh = useRefreshToken();

  async function axiosRequest(configObj: ConfigAxios): Promise<void> {
    const { method, url, requestBody = {} } = configObj;

    try {
      setLoading(true);
      const controller: AbortController = new AbortController();
      setController(controller);

      axiosInstance.defaults.withCredentials = true;
      const res = await axiosInstance[method](url, {
        ...requestBody,
        signal: controller.signal,
      });

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
        if (!prevRequest.sent) {
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

  return { response, error, loading, axiosRequest };
}

export default useAxios;
