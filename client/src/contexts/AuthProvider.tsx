import { createContext, useState } from 'react';
import { CurrentUser } from '../utils/types';

interface AuthContextOptions {
  authUser: CurrentUser;
  setAuthUser: (prevUser: CurrentUser) => void;
}
const AuthContext = createContext<AuthContextOptions>({
  authUser: null,
  setAuthUser: () => {},
});

interface Props {
  children?: React.ReactNode;
}
export function AuthProvider(props: Props) {
  const [auth, setAuth] = useState<CurrentUser>(null);

  const authContextValue: AuthContextOptions = {
    authUser: auth,
    setAuthUser: setAuth,
  };

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
