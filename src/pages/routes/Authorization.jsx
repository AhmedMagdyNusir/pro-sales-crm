import { Link, Outlet } from 'react-router-dom';
import CaptionCard from '../../components/ui/CaptionCard';
import unauthorized from '../../assets/unauthorized.svg';
import useAuth from '../../hooks/useAuth';

/**
 * `Authorization` is a component that checks if the current user's role matches the allowed role.
 *
 * If the user's role matches the allowed role, it renders the `Outlet` component, which renders the child routes.
 * If the user's role does not match the allowed role, it renders the `Unauthorized` component, which displays an error message.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.allowedRole - The role that is allowed to access the child routes.
 * @returns {ReactElement} An `Outlet` component if the user's role matches the allowed role, or an `Unauthorized` component otherwise.
 */

function Authorization({ allowedRole }) {
  const { auth } = useAuth();

  return auth.roles?.includes(allowedRole) ? <Outlet /> : <Unauthorized name={auth.firstName} />;
}

export default Authorization;

function Unauthorized({ name }) {
  return (
    <div className="flex-center h-full flex-col gap-3">
      <CaptionCard
        image={unauthorized}
        title="Unauthorized Access"
        paragraph={`Sorry, ${name}, you do not have the necessary permissions to access this page.`}
      />
      <Link to="/" className="btn-secondary px-4 py-2">
        Back to Home
      </Link>
    </div>
  );
}
