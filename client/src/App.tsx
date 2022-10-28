import logo from './logo.svg';
import Help from './components/Help';
import './App.scss';

import { Routes, Route } from 'react-router-dom';

import RequireAuth from './routes/RequireAuth';
import LoginPage from './routes/LoginPage';
import LandingPage from './routes/LandingPage';

import { logValidity } from './utils/helpers/log.helpers';
import { Validity, Roles } from './utils/constants/types.constants';

function App() {
  logValidity(Validity.PASS, 'pass message!');
  logValidity(Validity.FAIL, 'fail message!');

  async function getTestData() {
    await fetch(`${process.env.REACT_APP_LINK}/testdata`, {})
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
        <Route path='/landingpage' element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
