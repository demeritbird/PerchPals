import { useState, useEffect, useRef, Fragment } from 'react';
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

interface AxiosWrapper {
  blankComp?: JSX.Element;
  loadingComp?: JSX.Element;
  errorComp?: JSX.Element;
  successComp?: JSX.Element;
}

interface ResponseAxios {
  [key: string]: any;
}
enum AxiosResponseState {
  BLANK = 'blank',
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success',
}

function useAxios() {
  const [response, setResponse] = useState<ResponseAxios | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();
  const stateRef = useRef<AxiosResponseState>(AxiosResponseState.BLANK);

  const { authUser } = useAuth();
  const refresh = useRefreshToken();

  async function axiosRequest(configObj: ConfigAxios): Promise<void> {
    const { method, url, requestBody = {} } = configObj;

    try {
      stateRef.current = AxiosResponseState.LOADING;
      setLoading(true);
      setError(null);

      const controller: AbortController = new AbortController();
      setController(controller);

      axiosInstance.defaults.withCredentials = true;
      const res = await axiosInstance[method](url, {
        ...requestBody,
        signal: controller.signal,
      });

      stateRef.current = AxiosResponseState.SUCCESS;
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

      stateRef.current = AxiosResponseState.ERROR;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function axiosWrapper(wrapperObj: AxiosWrapper): JSX.Element {
    const { blankComp, errorComp, loadingComp, successComp } = wrapperObj;

    const curComponent = {
      blank: blankComp || <Fragment />,
      error: errorComp || <Fragment />,
      loading: loadingComp || <Fragment />,
      success: successComp || <Fragment />,
    };

    if (!response && stateRef.current === AxiosResponseState.SUCCESS) {
      if (error) stateRef.current = AxiosResponseState.ERROR;
      else if (loading) stateRef.current = AxiosResponseState.LOADING;
      else stateRef.current = AxiosResponseState.BLANK;
    }

    return <Fragment>{curComponent[stateRef.current]}</Fragment>;
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
    loading,
    axiosRequest,
    axiosWrapper,
  };
}

export default useAxios;
