import { useState, useEffect } from 'react';
import { AxiosInstance } from 'axios';

import { axiosPublic, logValidity } from '../utils/helpers';
import { Validity } from '../utils/types';

interface ConfigAxios {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  requestConfig?: {
    [key: string]: string;
  };
}
interface ResponseAxios {
  [key: string]: string;
}
function useAxios() {
  // TODO: set types
  const [response, setResponse] = useState<ResponseAxios | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (configObj: ConfigAxios) => {
    const { axiosInstance = axiosPublic, method, url, requestConfig = {} } = configObj;

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
      if (error instanceof Error) message = error.message;
      else message = String(error);

      setError(message);
      logValidity(Validity.FAIL, message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosFetch };
}

export default useAxios;
