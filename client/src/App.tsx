import './App.scss';
import React, { Fragment, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import useAxios from './hooks/useAxios';
import RequireAuth from './routes/RequireAuth';

import { axiosPublic, logValidity } from './utils/helpers';
import { Validity, Roles } from './utils/types';

import LoginPage from './routes/LoginPage';
const LandingPage = React.lazy(() => import('./routes/LandingPage'));

function App() {
  logValidity(Validity.PASS, 'pass message!');
  logValidity(Validity.FAIL, 'fail message!');

  const { response: testdata, error, loading, axiosFetch: getData } = useAxios();

  // async function getTestData() {
  //   await fetch(`${import.meta.env.VITE_LINK}/testdata`, {})
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

  function getTestData() {
    getData({
      axiosInstance: axiosPublic,
      method: 'get',
      url: '/testdata',
    });

    console.log(testdata);
  }

  // useEffect(() => {
  //   getTestData();
  // }, []);

  return (
    <Fragment>
      <button onClick={getTestData}>test me</button>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route
          path='/publicpage'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <LandingPage />
            </Suspense>
          }
        />

        <Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
          <Route path='/landingpage' element={<LandingPage />} />
        </Route>

        <Route path='/*' element={<h4>error</h4>} />
      </Routes>
    </Fragment>
  );
}

export default App;
