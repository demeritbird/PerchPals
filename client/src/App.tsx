import React, { Suspense } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';

import './App.scss'; // global stylesheet

import RequireAuth from './routes/RequireAuth';
import PersistLogin from './routes/PersistLogin';

import BackgroundImageWrapper from './components/wrappers/BackgroundImageWrapper';
import AuthPage from './routes/AuthPage';
const ActivatePage = React.lazy(() => import('./routes/ActivatePage'));
const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const ProfilePage = React.lazy(() => import('./routes/ProfilePage'));

function App() {
  const location = useLocation();
  const locationSegments = location.pathname.split('/').filter(Boolean);

  return (
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
            /* only active when not in auth routes */
            <BackgroundImageWrapper active={!(locationSegments[0] === 'auth')}>
              <Outlet />
            </BackgroundImageWrapper>
          }
        >
          {/* Authentication Pages */}
          <Route path='/auth' element={<AuthPage />}></Route>
          <Route element={<RequireAuth />}>
            <Route path='/auth/activate' element={<ActivatePage />} />
          </Route>

          {/* Dashboard Pages */}
          <Route element={<RequireAuth />}>
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
  );
}

export default App;
