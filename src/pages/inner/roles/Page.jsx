import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import StatsSection from './components/stats-section/Section';
import UserSection from './components/users-secion/Section';

export default function Roles() {
  useDocumentTitle('Roles');

  const { data: users, setData: setUsers, loading, error } = useOnLoadFetch('/manager/get-all-users');

  return (
    <div className="flex flex-col gap-6">
      <h1>Roles</h1>
      <StatsSection users={users} loading={loading} error={error} />
      <UserSection users={users} setUsers={setUsers} loading={loading} error={error} />
    </div>
  );
}
