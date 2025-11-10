import { Link } from 'react-router-dom';
import { getRoleName } from '../../../../roles/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../utils/faIcons';

export default function EmployeeCard({ user }) {
  return (
    <Link
      to={user.id}
      className="flex animate-fade-in-fast flex-col items-center gap-5 rounded-xl border border-transparent bg-gray-100 px-4 py-10 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 hover:shadow sm:gap-8"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex-center h-20 w-20 rounded-full border-2 border-white bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-3xl" />
        </div>
        <p className="text-base text-gray-800 sm:text-xl">
          {user.firstName} {user.lastName}
        </p>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span
          className={`flex-center rounded-full border border-white bg-gray-200 px-4 py-2 text-sm font-semibold ${user.emailConfirmed ? 'text-gray-500' : 'text-red-500'}`}
        >
          {!user.emailConfirmed ? 'Unconfirmed Account' : getRoleName(user.roles.length)}
        </span>
      </div>
    </Link>
  );
}
