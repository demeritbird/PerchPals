import { useEffect, Fragment } from 'react';
import useAxios from '../../hooks/useAxios';
import styles from './ProfilePage.module.scss';

function ProfilePage() {
  const { response, isLoading, isError, axiosRequest } = useAxios();
  async function getProfileData() {
    axiosRequest({
      method: 'get',
      url: 'api/v1/users/me',
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <Fragment>
      <h2>Profile Page</h2>
      <div className=''>
        {isLoading ? (
          <div>loading...</div>
        ) : isError ? (
          <div>error</div>
        ) : (
          <div>{response?.data.name}</div>
        )}
      </div>
    </Fragment>
  );
}

export default ProfilePage;
