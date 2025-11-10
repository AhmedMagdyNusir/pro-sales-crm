import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleName } from '../../utils';
import ChangeRoleModal from './ChangeRoleModal';
import icons from '../../../../../utils/faIcons';

export default function Card({ user, setUsers }) {
  const [changeRoleModaleOpen, setChangeRoleModaleOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-gray-100 px-4 py-10 shadow-sm sm:gap-8">
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
          className={`flex-center rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold ${user.emailConfirmed ? 'text-gray-500' : 'text-red-500'}`}
        >
          {!user.emailConfirmed ? 'Unconfirmed Account' : getRoleName(user.roles.length)}
        </span>
        {user.emailConfirmed && (
          <button
            onClick={() => setChangeRoleModaleOpen(true)}
            className="btn-primary rounded-full px-5 py-3 text-xs sm:text-sm"
          >
            Change Role
          </button>
        )}
      </div>

      {changeRoleModaleOpen && (
        <ChangeRoleModal user={user} setUsers={setUsers} setChangeRoleModaleOpen={() => setChangeRoleModaleOpen(false)} />
      )}
    </div>
  );
}
