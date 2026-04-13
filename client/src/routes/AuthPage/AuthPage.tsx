import { Fragment, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import LoginPanel from './layouts/LoginPanel';
import SignupPanel from './layouts/SignupPanel';

import styles from './AuthPage.module.scss';
import ProfileImage from 'src/components/images/ProfileImage';
import AppLogo from 'src/components/images/AppLogo';
import { Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from '../RequireAuth';
import { UserRoles } from '@backend/types';
import ActivatePanel from './layouts/ActivatePanel';
import ForgetPasswordPanel from './layouts/ForgetPasswordPanel';

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
          <Route
            path='/forget-password'
            element={
              <ForgetPasswordPanel
                setCurrentRegistrationHandler={setCurrentRegistrationState}
              />
            }
          />

          <Route element={<RequireAuth allowedRoles={[UserRoles.USER, UserRoles.ADMIN]} />}>
            <Route
              path='/activate'
              element={
                <ActivatePanel setCurrentRegistrationHandler={setCurrentRegistrationState} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default AuthPage;
