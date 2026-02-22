import { Fragment, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import LoginPanel from './layouts/LoginPanel';
import SignupPanel from './layouts/SignupPanel';
import AuthedPanel from './layouts/AuthedPanel';

import styles from './AuthPage.module.scss';
import ProfileImage from 'src/components/images/ProfileImage';
import AppLogo from 'src/components/images/AppLogo';
import { Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from '../RequireAuth';

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
    <div className={styles.container}>
      <Fragment>
        {authUser && currentRegistrationState === RegistrationStatus.AUTH ? (
          <ProfileImage src={authUser.photo} size='lg'></ProfileImage>
        ) : (
          <AppLogo size='lg'></AppLogo>
        )}
      </Fragment>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='/'
            element={
              <LoginPanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
            }
          ></Route>
          <Route
            path='/signup'
            element={
              <SignupPanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
            }
          ></Route>

          <Route element={<RequireAuth />}>
            {/* <Route path='/auth/activate' element={<ActivatePage />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default AuthPage;
