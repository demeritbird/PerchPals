import { useNavigate } from 'react-router-dom';

import useAuth from './../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useEffect } from 'react';

function LogoutButton() {
  const navigate = useNavigate();
  const { setAuthUser, setPersist } = useAuth();
  const { response: logoutResponse, axiosRequest: logoutRequest } = useAxios();

  useEffect(() => {
    if (logoutResponse != null) {
      setAuthUser(null);
      setPersist('false');
      navigate(`/`);
    }
  }, [logoutResponse]);

  function logoutHandler() {
    console.log('i was clicked');
    logoutRequest({
      method: 'post',
      url: 'api/v1/users/logout',
    });
  }

  return <button onClick={logoutHandler}>logout</button>;
}
export default LogoutButton;
