import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SignInForm from './layouts/SignInForm';

function LoginPage() {
  const { authUser } = useAuth();
  const location = useLocation();

  if (authUser) {
    return <Navigate to='/landingpage' state={{ from: location }} replace />;
  }

  return (
    <section>
      <SignInForm />
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

export default LoginPage;
