import { Outlet } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { logValidity } from '../utils/helpers';
import { Validity } from '../utils/types';

const TAG = '** PersistLogin';
function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { authUser, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        if (!response) throw new Error();

        logValidity(TAG, Validity.PASS, 'User shall be reallocated to current page!');
      } catch {
        logValidity(TAG, Validity.FAIL, 'There is no current user!');
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !authUser?.token && persist === 'true' ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Fragment>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</Fragment>
  );
}

export default PersistLogin;
