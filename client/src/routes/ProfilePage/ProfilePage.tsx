import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import styles from './ProfilePage.module.scss';

interface ProfileDataType {
  email:string
  name: string
}

function ProfilePage() {
  const { response, error, loading,  axiosRequest } = useAxios();
  async function getProfileData() {
    axiosRequest({
      method: 'get',
      url: 'api/v1/users/me'
    });
  }

  useEffect(() => {
    getProfileData();
  },[])

  const profileData: ProfileDataType = response ? response!.data.data : null

  return <div>{response? profileData.name : 'no profile'}</div>;
}

export default ProfilePage;
