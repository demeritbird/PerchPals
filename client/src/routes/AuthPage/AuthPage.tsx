import { Fragment, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import LoginPanel from './layouts/LoginPanel';
import SignupPanel from './layouts/SignupPanel';
import AuthedPanel from './layouts/AuthedPanel';

import styles from './AuthPage.module.scss';
import GlassContainerWrapper from 'src/components/wrappers/GlassContainerWrapper';
import ProfileImage from 'src/components/images/ProfileImage';
import AppLogo from 'src/components/images/AppLogo';

export enum RegistrationStatus {
  LOGIN = 'login', // currently on login
  SIGNUP = 'signup', // currently on signup
  RESET_PASSWORD = 'reset', // clicked reset password btn
  ACTIVATE = 'activate', // user has registered and now activating their account
  AUTH = 'auth', // already authenticated
}

function AuthPage() {
  const { authUser } = useAuth();
  const [currentRegistrationState, setCurrentRegistrationState] = useState<RegistrationStatus>(
    authUser ? RegistrationStatus.AUTH : RegistrationStatus.LOGIN
  );

  const loginPanel: JSX.Element = (
    <LoginPanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
  );
  const signupPanel: JSX.Element = (
    <SignupPanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
  );
  const resetPasswordPanel: JSX.Element = <Fragment></Fragment>;
  const authedPanel: JSX.Element = (
    <AuthedPanel
      currentUser={authUser}
      setCurrentRegistrationHandler={setCurrentRegistrationState}
    />
  );
  const activatePanel: JSX.Element = <Fragment></Fragment>;

  const panelStatus = {
    login: loginPanel,
    signup: signupPanel,
    reset: resetPasswordPanel,
    activate: activatePanel,
    auth: authedPanel,
  };

  return (
    <GlassContainerWrapper>
      <div className={styles.container}>
        {authUser && currentRegistrationState === RegistrationStatus.AUTH ? (
          <ProfileImage imageSrc={authUser.photo} size='large'></ProfileImage>
        ) : (
          <AppLogo size='lg'></AppLogo>
        )}
        <Fragment>{panelStatus[currentRegistrationState]}</Fragment>
      </div>
    </GlassContainerWrapper>
  );
}

export default AuthPage;
