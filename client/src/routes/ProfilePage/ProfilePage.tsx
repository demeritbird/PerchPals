import { useEffect, Fragment } from 'react';
import useAxios from '../../hooks/useAxios';
import styles from './ProfilePage.module.scss';

function ProfilePage() {
  const { response, error, loading, axiosRequest, axiosWrapper } = useAxios();
  async function getProfileData() {
    axiosRequest({
      method: 'get',
      url: 'api/v1/users/me',
    });
  }
  const profileData = axiosWrapper({
    loadingComp: <div>loading</div>,
    errorComp: <div>error</div>,
    successComp: <div>{response?.data.data.name}</div>,
  });

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <Fragment>
      <h2>Profile Page</h2>
      <div className=''>{profileData}</div>
    </Fragment>
  );
}

export default ProfilePage;
