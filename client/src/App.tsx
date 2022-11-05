import logo from './logo.svg';
import Help from './components/Help';
import './App.scss';
import React, { Fragment, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './routes/RequireAuth';

import { logValidity } from './utils/helpers/log.helpers';
import { Validity, Roles } from './utils/constants/types.constants';

const LoginPage = React.lazy(() => import('./routes/LoginPage'));
const LandingPage = React.lazy(() => import('./routes/LandingPage'));

function App() {
  logValidity(Validity.PASS, 'pass message!');
  logValidity(Validity.FAIL, 'fail message!');

  async function getTestData() {
    await fetch(`${import.meta.env.VITE_LINK}/testdata`, {})
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

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
