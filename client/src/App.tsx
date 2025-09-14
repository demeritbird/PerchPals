import React, { Fragment, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './index.scss'; // global stylesheet
import styles from './App.module.scss';

import RequireAuth from './routes/RequireAuth';
import PersistLogin from './routes/PersistLogin';

import { UserRoles } from '@backend/types';

import AuthPage from './routes/AuthPage';
const ActivatePage = React.lazy(() => import('./routes/ActivatePage'));
const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const ProfilePage = React.lazy(() => import('./routes/ProfilePage'));

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<PersistLogin />}>
          {/* Onboarding Layer */}
          <Route
            path='/'
            element={
              <Suspense fallback={<div>loading...</div>}>
                <div>Dashboard Page</div>
              </Suspense>
            }
          />

          {/* Application Layer */}
          <Route
            element={
              <div className={`${styles.container}`}>
                <Outlet />
              </div>
            }
          >
            {/* Authentication Pages */}
            <Route path='/auth' element={<AuthPage />}></Route>
            <Route element={<RequireAuth allowedRoles={[UserRoles.USER, UserRoles.ADMIN]} />}>
              <Route path='/auth/activate' element={<ActivatePage />} />
            </Route>

            {/* Dashboard Pages */}
            <Route element={<RequireAuth allowedRoles={[UserRoles.USER, UserRoles.ADMIN]} />}>
              <Route
                path='/landingpage'
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LandingPage />
                  </Suspense>
                }
              />
              <Route
                path='/profilepage'
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProfilePage />
                  </Suspense>
                }
              />
            </Route>
          </Route>

          <Route path='/*' element={<Navigate to='/auth' replace />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
