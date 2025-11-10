import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleName, permissions } from '../../utils';
import { breakboints, globalErrorMessage } from '../../../../../utils/utils';
import { roles as staticRoles } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import Modal from '../../../../../components/ui/Modal';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';

export default function ChangeRoleModal({ user, setUsers, setChangeRoleModaleOpen }) {
  const privateAxios = usePrivateAxios();

  const [roles, setRoles] = useState(user.roles.length);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function updateRole(roles) {
    try {
      setError('');
      setLoading(true);
      setSuccess(false);
      await privateAxios({
        method: 'PUT',
        url: '/manager/update-user-roles',
        data: { id: user.id, roles: roles },
      });
      setSuccess(true);
      setUsers((users) =>
        users.map((u) => {
          if (u.id === user.id) {
            return { ...u, roles: roles.filter((role) => role.isSelected).map((role) => role.name) };
          }
          return u;
        }),
      );
    } catch (error) {
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  function makeManager() {
    updateRole([
      { name: staticRoles.manager, isSelected: true },
      { name: staticRoles.moderator, isSelected: true },
      { name: staticRoles.sales, isSelected: true },
    ]);
  }

  function makeModerator() {
    updateRole([
      { name: staticRoles.manager, isSelected: false },
      { name: staticRoles.moderator, isSelected: true },
      { name: staticRoles.sales, isSelected: true },
    ]);
  }

  function makeSales() {
    updateRole([
      { name: staticRoles.manager, isSelected: false },
      { name: staticRoles.moderator, isSelected: false },
      { name: staticRoles.sales, isSelected: true },
    ]);
  }

  function revokeRole() {
    updateRole([
      { name: staticRoles.manager, isSelected: false },
      { name: staticRoles.moderator, isSelected: false },
      { name: staticRoles.sales, isSelected: false },
    ]);
  }

  return (
    <Modal title="Change User Role" setOpen={setChangeRoleModaleOpen} className="modal-height">
      <div className="flex flex-col gap-4 p-5">
        <p className="text-sm">
          {user.firstName} is now a <b>{getRoleName(user.roles.length)}</b>. You can change their role by selecting one of
          the following options.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <RoleButton
            name="Manager"
            icon={icons.manager}
            isSelected={roles === 3}
            onClick={() => {
              setRoles(3);
            }}
          />
          <RoleButton
            name="Marketing Moderator"
            icon={icons.moderator}
            isSelected={roles === 2}
            onClick={() => {
              setRoles(2);
            }}
          />
          <RoleButton
            name="Sales Representative"
            icon={icons.sales}
            isSelected={roles === 1}
            onClick={() => {
              setRoles(1);
            }}
          />
          <RoleButton
            name="Revoke Role"
            icon={icons.xCircle}
            isSelected={roles === 0}
            onClick={() => {
              setRoles(0);
            }}
          />
        </div>
        <div className="h-[185px] rounded-xl bg-gray-50 p-4 text-gray-500">
          <span className="mb-2 block font-semibold">{getRoleName(roles)} Permissions</span>
          <ul className="list-disc pl-5">
            {permissions[roles === 3 ? 'manager' : roles === 2 ? 'moderator' : roles === 1 ? 'sales' : 'noRoles'].map(
              (state) => (
                <li>{state}</li>
              ),
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              roles === 3 ? makeManager() : roles === 2 ? makeModerator() : roles === 1 ? makeSales() : revokeRole();
            }}
            disabled={loading}
            className="btn-primary flex-center w-full gap-1 rounded-xl px-4 py-3 text-sm"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={icons.spinner} spin className="mr-1" />
                <span>Changing</span>
              </>
            ) : (
              'Change'
            )}
            <span>Role</span>
          </button>
          <div className="flex-1">
            {success && <Alert.Success message={`${user.firstName} is now a ${getRoleName(roles)}.`} />}
            {error && <Alert.Error message={error} />}
          </div>
        </div>
      </div>
      <style>
        {`
          @media (min-width: ${breakboints.sm}) {
            .modal-height {
              height: auto !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}

function RoleButton({ name, icon, isSelected, onClick }) {
  return (
    <button
      className={`flex-center h-28 flex-col gap-3 rounded-xl p-2 text-xs font-semibold sm:text-sm ${
        isSelected ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
      {name}
    </button>
  );
}
