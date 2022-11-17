import { useState, useEffect } from 'react';
import { AxiosError, AxiosInstance } from 'axios';
import { axiosPublic } from '../utils/helpers';

interface ConfigAxios {
  axiosInstance?: AxiosInstance;
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

  async function axiosRequest(configObj: ConfigAxios): Promise<void> {
    const { axiosInstance = axiosPublic, method, url, requestBody: requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const controller: AbortController = new AbortController();
      setController(controller);

      const res = await axiosInstance[method](url, {
        ...requestConfig,
        signal: controller.signal,
      });
      setResponse(res.data);
    } catch (error) {
      let message;
      if (error instanceof AxiosError && error.response) {
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
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosRequest };
}

export default useAxios;
