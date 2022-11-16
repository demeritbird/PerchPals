import { createContext, useState } from 'react';
import { CurrentUser, Roles } from '../utils/types';

interface AuthContextOptions {
  authUser: CurrentUser;
  authLogIn: (email: string, password: string) => void;
  authLogOut: () => void;
  authSignIn: () => void;
}
const AuthContext = createContext<AuthContextOptions>({
  authUser: null,
  authLogIn: () => {},
  authLogOut: () => {},
  authSignIn: () => {},
});

interface Props {
  children?: React.ReactNode;
}
export function AuthProvider(props: Props) {
  const [auth, setAuth] = useState<CurrentUser>(null);

  function sendAuth(url: string, email: string, password: string) {
    // TODO: use Axios POST here
  }

  function loginHandler(email: string, password: string) {
    // TODO: Add login functionality

    console.log('login');
    setAuth({
      email: 'login@email.com',
      name: 'testname',
      role: Roles.USER,
      token: 'blank',
    });
  }

  function logoutHandler() {
    // TODO: Add logout functionality

    console.log('logout');
    setAuth(null);
  }

  function signupHandler() {
    // TODO: Add signup functionality

    console.log('signup');
    setAuth({
      email: 'signup@email.com',
      name: 'testname',
      role: Roles.USER,
      token: 'blank',
    });
  }

  const authContextValue: AuthContextOptions = {
    authUser: auth,
    authLogIn: loginHandler,
    authLogOut: logoutHandler,
    authSignIn: signupHandler,
  };

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
