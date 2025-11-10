import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CaptionCard from '../../../components/ui/CaptionCard';
import unauthorized from '../../../assets/unauthorized.svg';

/**
 * This component represents a locked page that is displayed to users who do not have any roles assigned.
 * If the user has roles, they are redirected to the homepage.
 * Otherwise, a message is displayed informing the user that they do not have any roles assigned and need to contact their manager.
 */

export default function Locked() {
  useDocumentTitle('Locked');

  const { auth } = useAuth();

  if (auth.roles.length === 0) return <NoRolesUserMessage name={auth.firstName} />;
  else return <Navigate to="/" replace={true} />;
}

function NoRolesUserMessage() {
  return (
    <div className="flex-center h-full flex-col gap-3">
      <CaptionCard image={unauthorized} title="Welcome to Pro Sales" />
      <p className="text-center">You're all set to get started, but it seems you don't have any roles assigned yet.</p>
      <p className="text-center">Please reach out to your manager to unlock access to all features.</p>
      <p className="text-center">
        Also, please note that your account will be permanently deleted if not assigned to a role within 5 days.
      </p>
    </div>
  );
}
