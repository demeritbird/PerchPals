import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';
import ProfileImage from '../../../../components/images/ProfileImage';
import AuthPrimaryButton from '../../../../components/buttons/AuthPrimaryButton';

import styles from './AuthedPanel.module.scss';

import { AccountStatus } from '@backend/types';
import { CurrentUser, Validity } from '../../../../utils/types';
import { RegistrationStatus } from '../../AuthPage';
import { logValidity } from '../../../../utils/helpers';

interface AuthedPanelProps {
  currentUser: CurrentUser;
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Authed Panel';
function AuthedPanel(props: AuthedPanelProps) {
  const navigate = useNavigate();
  const { currentUser: user, setCurrentRegistrationHandler: setCurrentRegistrationState } =
    props;
  const { setAuthUser, setPersist } = useAuth();

  const { response: getMeResponse, axiosRequest: getMeRequest } = useAxios();
  const { response: logoutResponse, axiosRequest: logoutRequest } = useAxios();

  async function getProfileData() {
    getMeRequest({
      method: 'get',
      url: 'api/v1/users/me',
    });
  }

  function authedLoginHandler() {
    user && user.active === AccountStatus.PENDING
      ? navigate(`/activate`)
      : navigate(`/landingpage`);
  }

  async function logoutHandler() {
    logoutRequest({
      method: 'post',
      url: 'api/v1/users/logout',
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    if (logoutResponse != null) {
      logValidity(TAG, Validity.PASS, `${user?.name} has successfully logged out!`);

      setAuthUser(null);
      setPersist('false');
      setCurrentRegistrationState(RegistrationStatus.LOGIN);
    }
  }, [logoutResponse]);

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        <ProfileImage
          imageSrc={`data:image/png;base64, ${getMeResponse?.data.photo}`}
          size='medium'
          hasBorder={false}
        />
        <h3 className={styles.greeting__upper}>Welcome back,</h3>
        <h2 className={styles.greeting__lower}>{getMeResponse?.data.name}</h2>
      </div>
      <div className={styles.panel__section}>
        <AuthPrimaryButton onClickHandler={authedLoginHandler}>Log In</AuthPrimaryButton>
        <p className={styles.prompt}>
          Using a different account?{' '}
          <span className={styles.prompt__highlight} onClick={logoutHandler}>
            Log Out
          </span>
        </p>
      </div>
    </div>
  );
}
export default AuthedPanel;
