import useAuth from '../../hooks/useAuth';
import SignInForm from './layouts/SignInForm';

function LoginPage() {
  const { authUser } = useAuth();
  // TODO: check if authenticated. If so, bring him to application page.
  // Or do it from the routes page like RequireAuth instead.
  
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
