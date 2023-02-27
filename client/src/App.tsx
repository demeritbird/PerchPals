import './App.scss';
import React, { Fragment, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import useAxios from './hooks/useAxios';
import useLocalStorage from './hooks/useLocalStorage';
import useRefreshToken from './hooks/useRefreshToken';
import RequireAuth from './routes/RequireAuth';
import PersistLogin from './routes/PersistLogin';

import { Roles } from './utils/types';

import AuthPage from './routes/AuthPage';
const LandingPage = React.lazy(() => import('./routes/LandingPage'));

function App() {
  const { response: testdata, error, loading, axiosRequest: getData } = useAxios();
  const refresh = useRefreshToken();
  const [store, setStore] = useLocalStorage('key', {
    name: 'foo',
  });

  useEffect(() => {
    console.log(testdata);
  }, [testdata]);

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
      <h1>{store.name}</h1>
      <button onClick={getTestData}>test me</button>
      <button onClick={refresh}>refresh</button>
      <Routes>
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
            <Route path='/landingpage' element={<LandingPage />} />
          </Route>
        </Route>
        <Route path='/*' element={<h4>error</h4>} />
      </Routes>
    </Fragment>
  );
}

export default App;
