import { periodOptions } from '../../../../utils/utils';

export default function GlobalStats({ data, period }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
      <StatSquare title="Customers" data={data.customers} period={period.value} gradient="from-violet-200 to-pink-200" />
      <StatSquare title="Actions" data={data.actions} period={period.value} gradient="from-green-200 to-lime-200" />
      <StatSquare title="Deals" data={data.deals} period={period.value} gradient="from-yellow-200 to-red-200" />
      <StatSquare title="Revenue" data={data.revenue} period={period.value} gradient="from-blue-200 to-green-200" price />
    </div>
  );
}

function StatSquare({ title, data, period, gradient, price }) {
  return (
    <div
      className={`animate-fade-in-fast rounded-xl bg-gradient-to-r sm:rounded-3xl ${gradient} p-4 text-gray-800 shadow sm:p-6`}
    >
      <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{title}</h3>
      <div className="mt-8 flex flex-col flex-wrap gap-2 md:flex-row md:items-end">
        <span className="text-xl font-semibold sm:text-2xl lg:text-3xl">
          {period === periodOptions[0].value
            ? price
              ? `$${formatPrice(data.total)}`
              : data.total
            : period === periodOptions[1].value
              ? price
                ? `$${formatPrice(data.today)}`
                : data.today
              : period === periodOptions[2].value
                ? price
                  ? `$${formatPrice(data.thisWeek)}`
                  : data.thisWeek
                : period === periodOptions[3].value
                  ? price
                    ? `$${formatPrice(data.thisMonth)}`
                    : data.thisMonth
                  : null}
        </span>
        {period === periodOptions[0].value ? (
          <span className="text-xs sm:text-sm">+{price ? `$${formatPrice(data.thisWeek)}` : data.thisWeek} this week</span>
        ) : period === periodOptions[1].value ? (
          <span className="text-xs sm:text-sm">{periodOptions[1].label}</span>
        ) : period === periodOptions[2].value ? (
          <span className="text-xs sm:text-sm">{periodOptions[2].label}</span>
        ) : period === periodOptions[3].value ? (
          <span className="text-xs sm:text-sm">{periodOptions[3].label}</span>
        ) : null}
      </div>
    </div>
  );
}

function formatPrice(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}
