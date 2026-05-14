import { createContext, useContext } from 'react';
import { CurrentUser } from '@/utils/types';

export type PersistType = 'true' | 'false';
export interface AuthContextOptions {
  authUser: CurrentUser;
  setAuthUser: React.Dispatch<React.SetStateAction<CurrentUser>>;

  persist: PersistType;
  setPersist: (prevSel: PersistType) => void;
}
export const AuthContext = createContext<AuthContextOptions | undefined>(undefined);

/**
 * select current authenticated user (if any) and their configs
 *
 * @example
 * const { authUser, setAuthUser, persist, setPersist } = useAuth();
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Missing Auth Context');
  return context;
};

export default useAuth;
