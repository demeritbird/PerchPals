import axios from 'axios';
import useAuth from './useAuth';

import { logValidity } from '../utils/helpers';
import { Validity } from '../utils/types';

const TAG = '** useRefreshToken';
function useRefreshToken() {
  const { setAuthUser } = useAuth();

  async function refresh(): Promise<string | null> {
    const response = await axios(`${import.meta.env.VITE_LINK}api/v1/users/refresh`, {
      method: 'GET',
      withCredentials: true,
    }).catch(() => {
      return null;
    });
    if (!response) {
      logValidity(TAG, Validity.FAIL, 'There is no current user!');
      return null;
    }

    const refreshUser = {
      id: response.data.data.user._id,
      name: response.data.data.user.name,
      email: response.data.data.user.email,
      role: response.data.data.user.role,
      active: response.data.data.user.active,
      token: response.data.token,
    };
    setAuthUser(refreshUser);
    logValidity(TAG, Validity.PASS, 'User detected. Your access token has been refreshed!');
    return response.data.token;
  }

  return refresh;
}

export default useRefreshToken;
