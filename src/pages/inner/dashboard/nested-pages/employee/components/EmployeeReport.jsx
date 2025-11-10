import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../utils/faIcons';
import InterestsStats from '../../../components/InterestsStats';
import SourcesStats from '../../../components/SourcesStats';
import medalImg from '../../../../../../assets/medal.png';
import { periodOptions } from '../../../../../../utils/utils';

export default function EmployeeReport({ employee, period }) {
  console.log(employee); // See the data in console, then remove this line

  return (
    <div className="flex flex-col gap-4">
      {/* Employee Name */}
      <div className="flex items-center gap-5 rounded-xl bg-pro-50 p-5">
        <div className="flex-center h-20 w-20 rounded-full border-2 border-white bg-white">
          <FontAwesomeIcon icon={icons.user} className="text-3xl" />
        </div>
        <div>
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="mt-1">Assigned Customers: {employee.customers}</p>
        </div>
      </div>

      {/* Actions Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        <StatSquare
          title="Calls"
          hover={Object.entries(employee.calls)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
          data={Object.values(employee.calls).reduce((acc, val) => acc + val, 0)} // Sum of all values
          period={period.value}
          gradient="from-violet-200 to-pink-200"
        />
        <StatSquare title="Messages" data={employee.messages} period={period.value} gradient="from-green-200 to-lime-200" />
        <StatSquare
          title="Meetings"
          hover={Object.entries(employee.meetings)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
          data={Object.values(employee.meetings).reduce((acc, val) => acc + val, 0)} // Sum of all values
          period={period.value}
          gradient="from-yellow-200 to-red-200"
        />
        <StatSquare title="Deals" data={employee.deals} period={period.value} gradient="from-blue-200 to-green-200" />
      </div>

      {/* Employee Best Deal */}
      {employee.bestDeal && (
        <div className="relative flex items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-sky-500 to-pro-300 px-8 py-6">
          <div className="flex gap-5">
            <div className="flex-center h-14 min-w-14 rounded-full border-2 border-white bg-white sm:h-20 sm:min-w-20">
              <FontAwesomeIcon icon={icons.star} className="text-xl text-yellow-500 hover:animate-pulse sm:text-3xl" />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Best Deal</h2>
              <div className="scrollbar-hide flex flex-wrap gap-2 overflow-auto">
                <BestDealBadge
                  icon={icons.user}
                  title={`${employee.bestDeal.customerFirstName} ${employee.bestDeal.customerLastName}`}
                />
                <BestDealBadge icon={icons.money} title={employee.bestDeal.dealPrice} />
                <BestDealBadge icon={icons.interest} title={employee.bestDeal.interestName} />
              </div>
            </div>
          </div>
          <div className="px-5">
            <img src={medalImg} alt="Best Deal" className="w-20" />
          </div>
        </div>
      )}

      {/* Employee Charts */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <InterestsStats data={employee.doneDeals} />
        </div>
        <div className="xl:col-span-2">
          <SourcesStats data={employee.sources} />
        </div>
      </section>
    </div>
  );
}

function BestDealBadge({ icon, title }) {
  return (
    <span className="flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-sm shadow">
      <FontAwesomeIcon icon={icon} className="text-pro-300" />
      {/* <span className='bg-pro-300 h-3 w-3 rounded-full'></span> */}
      <span className="text-nowrap text-gray-800">{title}</span>
    </span>
  );
}

function StatSquare({ title, hover, data, period, gradient }) {
  return (
    <div
      title={hover}
      className={`animate-fade-in-fast rounded-xl bg-gradient-to-r sm:rounded-3xl ${gradient} p-4 text-gray-800 shadow sm:p-6`}
    >
      <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{title}</h3>
      <div className="mt-8 flex flex-col flex-wrap gap-2 md:flex-row md:items-end">
        <span className="text-xl font-semibold sm:text-2xl lg:text-3xl">
          {period === periodOptions[0].value
            ? data
            : period === periodOptions[1].value
              ? data
              : period === periodOptions[2].value
                ? data
                : period === periodOptions[3].value
                  ? data
                  : null}
        </span>
        {period === periodOptions[0].value ? (
          <span className="text-xs sm:text-sm">{title}</span>
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
