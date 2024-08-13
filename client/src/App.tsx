import './App.scss';
import React, { Fragment, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import useAxios from './hooks/useAxios';
import useLocalStorage from './hooks/useLocalStorage';
import useRefreshToken from './hooks/useRefreshToken';
import RequireAuth from './routes/RequireAuth';
import PersistLogin from './routes/PersistLogin';

import { Roles } from '@backend/types';

import AuthPage from './routes/AuthPage';
const ActivatePage = React.lazy(() => import('./routes/ActivatePage'));
const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const ProfilePage = React.lazy(() => import('./routes/ProfilePage'));

function App() {
  const { response: testdata, error, isLoading, axiosRequest: getData } = useAxios();
  const refresh = useRefreshToken();
  const [store, setStore] = useLocalStorage('key', {
    name: 'foo',
  });

  useEffect(() => {
    setStore({
      name: 'bar',
    });
  }, []);

  async function getTestData() {
    getData({
      method: 'get',
      url: 'api/v1/users/test',
    });
  }

  return (
    <Fragment>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<AuthPage />} />
          <Route path='/auth' element={<AuthPage />} />

          <Route
            path='/publicpage'
            element={
              <Suspense fallback={<div>loading...</div>}>
                <LandingPage />
              </Suspense>
            }
          />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
              <Route path='/activate' element={<ActivatePage />} />
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
        </Route>
        <Route path='/*' element={<h4>error</h4>} />
      </Routes>
    </Fragment>
  );
}

export default App;
