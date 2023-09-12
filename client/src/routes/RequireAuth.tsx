import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import { AccountStatus, Roles } from '@backend/types';

interface AllowedRolesProps {
  allowedRoles: Array<Roles>;
}
function RequireAuth(props: AllowedRolesProps) {
  const { allowedRoles } = props;
  const { authUser } = useAuth();
  const location = useLocation();

  console.log('====');
  console.log(authUser);

  return authUser && authUser.active === AccountStatus.PENDING ? (
    <Navigate to='/activate' />
  ) : authUser &&
    authUser.active === AccountStatus.ACTIVE &&
    allowedRoles.includes(authUser.role) &&
    location.pathname !== '/activate' ? (
    <Outlet />
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

export default RequireAuth;
