import { Fragment, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import LoginPanel from './layouts/LoginPanel';
import SignupForm from './layouts/SignupForm';
import AuthedPanel from './layouts/AuthedPanel';

import styles from './AuthPage.module.scss';

export enum RegistrationStatus {
  LOGIN = 'login',
  SIGNUP = 'signup',
  AUTHED = 'authed',
}

function AuthPage() {
  const { authUser } = useAuth();
  const [currentRegistrationState, setCurrentRegistrationState] = useState<RegistrationStatus>(
    authUser ? RegistrationStatus.AUTHED : RegistrationStatus.LOGIN
  );

  const loginPanel: JSX.Element = (
    <LoginPanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
  );
  const signupPanel: JSX.Element = <SignupForm />;
  const authedPanel: JSX.Element = (
    <AuthedPanel
      currentUser={authUser}
      setCurrentRegistrationHandler={setCurrentRegistrationState}
    />
  );

  const panelStatus = {
    login: loginPanel,
    signup: signupPanel,
    authed: authedPanel,
  };

  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.container}`}>
        <aside className={`${styles.container__infographics}`}></aside>
        <section className={`${styles['container__auth-panel']}`}>
          <Fragment>{panelStatus[currentRegistrationState]}</Fragment>
          {/* TODO: Maybe we should consolidate the same Auth-Button into this  
          component instead of splitting bwt all states? */}
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
