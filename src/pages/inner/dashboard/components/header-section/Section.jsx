import { periodOptions } from '../../../../../utils/utils';

export default function DashboardHeaderSection({ selectedPeriod, setSelectedPeriod }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <h1>Manager Dashboard</h1>
      <div className="flex flex-wrap gap-2">
        {periodOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedPeriod(option)}
            className={`flex-center text-nowrap rounded-lg px-3 py-2 text-xs font-semibold sm:px-4 sm:py-3 sm:text-sm ${selectedPeriod.value === option.value ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
