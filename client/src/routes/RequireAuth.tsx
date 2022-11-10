import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import { Roles } from '../utils/types';

interface AllowedRolesProps {
  allowedRoles: Array<Roles>;
}

function RequireAuth(props: AllowedRolesProps) {
  const { allowedRoles } = props;
  const { user } = useAuth();
  const location = useLocation();

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;
