export default function StatsCard({ title, value, loading }) {
  return (
    <div className="flex h-[110px] w-56 flex-col justify-between rounded-xl bg-white px-5 py-4 shadow">
      <p className="text-nowrap">{title}</p>
      {loading ? (
        <div className="h-6 w-24 animate-pulse rounded-xl bg-gray-200"></div>
      ) : (
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      )}
    </div>
  );
}
