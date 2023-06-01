import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CurrentUser } from '../utils/types';

type PersistType = 'true' | 'false';
interface AuthContextOptions {
  authUser: CurrentUser;
  setAuthUser: (prevUser: CurrentUser | ((prevUser: CurrentUser) => CurrentUser)) => void;
  persist: PersistType;
  setPersist: (prevSel: PersistType) => void;
}
const AuthContext = createContext<AuthContextOptions>({
  authUser: null,
  setAuthUser: () => {},
  persist: 'false',
  setPersist: () => {},
});

interface AuthProviderProps {
  children?: React.ReactNode;
}
export function AuthProvider(props: AuthProviderProps) {
  const [auth, setAuth] = useState<CurrentUser>(null);
  const [persistStore, setPersistStore] = useLocalStorage<PersistType>('persist', 'false');

  const authContextValue: AuthContextOptions = {
    authUser: auth,
    setAuthUser: setAuth,
    persist: persistStore,
    setPersist: setPersistStore,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
