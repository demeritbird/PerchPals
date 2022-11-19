import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginForm from './layouts/LoginForm';
import SignupForm from './layouts/SignupForm';

function EntryPage() {
  const { authUser } = useAuth();
  const location = useLocation();

  if (authUser) {
    return <Navigate to='/landingpage' state={{ from: location }} replace />;
  }

  return (
    <section>
      <LoginForm />
      <SignupForm />
    </section>
  );
}

export default EntryPage;
