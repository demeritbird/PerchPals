import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import { AccountStatus, UserRoles } from '@backend/types';

import { Fragment } from 'react';

interface RequireAuthProps {
  allowedRoles?: Array<UserRoles>;
}

/**
 * based on a user's status within the application,
 * this wrapper determines which page the user shall be routed to.
 * @example  <Route element={<RequireAuth allowedRoles={[UserRoles.x, ...]} />}>
               <Route ... />
             </Route>
 */
function RequireAuth(props: RequireAuthProps) {
  // allow access to all roles if no props provided.
  const { allowedRoles = Object.values(UserRoles) } = props;

  const { authUser } = useAuth();
  const location = useLocation();
  const locationSegments = location.pathname.split('/').filter(Boolean);

  function navigateToRoute(): JSX.Element {
    // user is not authenticated
    if (!authUser) return <Navigate to='/auth' state={{ from: location }} replace />;
    // user is authenticated but has not activated their account
    if (authUser.active === AccountStatus.PENDING)
      return <Navigate to='/auth/activate' state={{ from: location }} replace />;
    // user has already authenticated and activated account but chooses to go to activate page.
    // OR user has no role-access to this page
    // NOTE: landing page should be open to all roles.
    if (locationSegments.at(-1) === 'activate' || !allowedRoles.includes(authUser.role))
      return <Navigate to='/landingpage' state={{ from: location }} replace />;

    // otherwise they should navigate to intended route
    return <Outlet />;
  }

  return <Fragment>{navigateToRoute()}</Fragment>;
}

export default RequireAuth;
