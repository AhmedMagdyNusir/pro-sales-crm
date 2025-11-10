import { getUsersStats } from '../../utils';
import StatsCard from './StatsCard';

export default function StatsSection({ users, loading, error }) {
  let stats;

  if (users) stats = getUsersStats(users);

  return (
    !error && (
      <section className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4">
        <p>Users Statistics</p>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          <StatsCard title="Managers" value={stats.managers} loading={loading} />
          <StatsCard title="Marketing Moderators" value={stats.marketingModerators} loading={loading} />
          <StatsCard title="Sales Representatives" value={stats.salesRepresentatives} loading={loading} />
          <StatsCard title="Users Without Roles" value={stats.noRoles} loading={loading} />
          <StatsCard title="Unconfirmed Accounts" value={stats.unconfirmed} loading={loading} />
        </div>
      </section>
    )
  );
}
