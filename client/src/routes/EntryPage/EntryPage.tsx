import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginForm from './layouts/LoginForm';

function EntryPage() {
  const { authUser } = useAuth();
  const location = useLocation();

  if (authUser) {
    return <Navigate to='/landingpage' state={{ from: location }} replace />;
  }

  return (
    <section>
      <LoginForm />
      <p>
        Need an Account?
        <br />
        <span className='line'>
          <button>sign up</button>
        </span>
      </p>
    </section>
  );
}

export default EntryPage;
