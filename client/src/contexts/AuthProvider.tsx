import { createContext, useState } from 'react';
import { User, Roles } from './../utils/constants/types.constants';

interface AuthContextType {
  user: User;
  login: () => void;
  logout: () => void;
  signup: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

interface Props {
  children?: React.ReactNode;
}
export function AuthProvider(props: Props) {
  const [auth, setAuth] = useState<User>(null);

  function sendAuth(url: string, email: string, password: string) {
    // TODO: use Axios POST here
  }

  function loginHandler() {
    // TODO: Add login functionality

    console.log('login');
    setAuth({
      email: 'login@email.com',
      name: 'testname',
      role: [Roles.USER],
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
      role: [Roles.USER],
      token: 'blank',
    });
  }

  const authContextValue: AuthContextType = {
    user: auth,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
  };

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
