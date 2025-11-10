import { useState } from 'react';
import { Link } from 'react-router-dom';
import { paths, roles } from '../../../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useOnLoadFetch from '../../../../../hooks/useOnLoadFetch';
import EmployeeCard from './components/UserCard';
import icons from '../../../../../utils/faIcons';
import InputField from '../../../../../components/ui/InputField';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';

export default function EmployeesStats() {
  useDocumentTitle('Employees Reports');

  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useOnLoadFetch('manager/get-all-users');

  const employees = data
    .filter((user) => user.roles.length > 0 && !user.roles.includes(roles.manager))
    .filter((user) => {
      const term = searchTerm.toLowerCase();
      return (
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });

  return (
    <div className="flex h-full flex-col gap-5">
      <h1>Employees Reports</h1>
      <div className="flex flex-wrap justify-between gap-4">
        <Link
          to={`/${paths.dashboard}`}
          className="w-fit rounded-xl bg-gray-100 px-4 py-3 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
        >
          <FontAwesomeIcon icon={icons.back} className="mr-2" />
          Back to Dashboard
        </Link>
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
        <div className="flex-center h-full animate-fade-in-fast flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.spinner} className="animate-spin-slow text-3xl" />
          <span>Loading Employees</span>
        </div>
      ) : error ? (
        <div className="flex-center h-full animate-fade-in-fast flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.exclamationCircle} className="text-3xl" />
          <span>Error Loading Employees</span>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex-center h-full animate-fade-in-fast flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.exclamationCircle} className="text-3xl" />
          <span>No Employees Found</span>
        </div>
      ) : (
        <div className="grid-col-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4">
          {employees.map((user) => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
