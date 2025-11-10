import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';
import InputField from '../../../../../components/ui/InputField';

export default function UserSection({ users, setUsers, loading, error }) {
  const [selectedRole, setSelectedRole] = useState('All Users');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = [
    'All Users',
    'Managers',
    'Marketing Moderators',
    'Sales Representatives',
    'Users Without Roles',
    'Unconfirmed Accounts',
  ];

  const filteredUsers = (
    selectedRole === 'All Users'
      ? users
      : users.filter((user) =>
          selectedRole === 'Unconfirmed Accounts'
            ? !user.emailConfirmed
            : user.roles.length ===
              (selectedRole === 'Managers'
                ? 3
                : selectedRole === 'Marketing Moderators'
                  ? 2
                  : selectedRole === 'Sales Representatives'
                    ? 1
                    : 0),
        )
  ).filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-between gap-x-14 gap-y-6">
        {/* Roles filter */}
        <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1">
          {roles.map((role) => (
            <button
              key={role}
              className={`${role === selectedRole ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'} text-nowrap rounded-full px-4 py-2 text-xs transition-colors sm:text-sm`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex flex-1 gap-2">
          <InputField
            type="text"
            icon={icons.search}
            className="min-w-60 text-sm"
            placeholder="Search users by name, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setSearchTerm('')}
            className="rounded-xl bg-gray-100 px-4 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
          >
            <FontAwesomeIcon icon={icons.x} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid-col-1 xxl:grid-cols-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton length={3} />
        </div>
      ) : error ? (
        <Alert.Error message={error} />
      ) : filteredUsers.length === 0 ? (
        <div className="flex-center h-72 flex-col gap-5 rounded-xl bg-gray-50">
          <FontAwesomeIcon icon={icons.leaf} className="text-3xl sm:text-5xl" />
          <p>No users found</p>
        </div>
      ) : (
        <div className="grid-col-1 xxl:grid-cols-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} user={user} setUsers={setUsers} />
          ))}
        </div>
      )}
    </div>
  );
}
