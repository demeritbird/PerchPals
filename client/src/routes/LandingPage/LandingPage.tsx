import { Fragment } from 'react';
import LogoutButton from '../../components/buttons/LogoutButton';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <h1>Landing Page</h1>
      <button onClick={() => {(navigate(`/profilepage`))}}>Profile Page</button>
      <LogoutButton />
    </Fragment>
  );
}

export default LandingPage;
