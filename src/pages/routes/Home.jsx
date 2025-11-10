import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { paths, roles } from '../../utils/utils';

/**
 * This component is not an actual page, but a director to the homepage according to the user's role.
 * If the user is a manager, they are redirected to the dashboard.
 * If the user is a moderator, they are redirected to the customers page.
 * If the user is a sales representative, they are redirected to the assigned customers page.
 * If the user does not have a recognized role, they are redirected to the locked page.
 */

function Home() {
  const { auth } = useAuth();
  return auth.roles.includes(roles.manager) ? (
    <Navigate to={`/${paths.dashboard}`} replace={true} />
  ) : auth.roles.includes(roles.moderator) ? (
    <Navigate to={`/${paths.customers}`} replace={true} />
  ) : auth.roles.includes(roles.sales) ? (
    <Navigate to={`/${paths.assignedCustomers}`} replace={true} />
  ) : (
    <Navigate to={`/${paths.locked}`} replace={true} />
  );
}

export default Home;
