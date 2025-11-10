import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { paths } from '../../utils/utils';

/**
 * `Authentication` is a component that handles route protection based on authentication status.
 * 
 * It accepts a `requireUnauthenticated` prop, which determines whether the route requires the user to be unauthenticated.
 * 
 * If `requireUnauthenticated` is false (or this prop isn't passed), it only allows authenticated users to access the route. If an unauthenticated user tries to access the route, they are redirected to the login page.
 * 
 * If `requireUnauthenticated` is true, it only allows unauthenticated users to access the route. If an authenticated user tries to access the route, they are redirected to the previous page or the home page.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.requireUnauthenticated - Whether the route requires the user to be unauthenticated.
 * @returns {ReactElement} An `Outlet` component if the user is allowed to access the route, or a `Navigate` component if they are not.
 */

function Authentication({ requireUnauthenticated }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (requireUnauthenticated) {
    return !auth.accessToken ? <Outlet /> : <Navigate to={location.state?.from || '/'} replace={true} />;
  }

  return auth.accessToken ? <Outlet /> : <Navigate to={`/${paths.login}`} state={{ from: location.pathname }} replace={true} />;
}

export default Authentication;
