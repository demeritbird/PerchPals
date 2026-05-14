import { ReactNode, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CurrentUser } from '../utils/types';
import { AuthContext, AuthContextOptions, PersistType } from '@/hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
  value?: CurrentUser;
}

export function AuthProvider(props: AuthProviderProps) {
  const { value, children } = props;

  const [auth, setAuth] = useState<CurrentUser>(value ?? null);
  const [persistStore, setPersistStore] = useLocalStorage<PersistType>('persist', 'false');

  const authContextValue: AuthContextOptions = {
    authUser: auth,
    setAuthUser: setAuth,
    persist: persistStore,
    setPersist: setPersistStore,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
