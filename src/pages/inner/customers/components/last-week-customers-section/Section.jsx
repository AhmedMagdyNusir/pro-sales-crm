import useOnLoadFetch from '../../../../../hooks/useOnLoadFetch';
import CustomerCard from './CustomerCard';
import CustomersCardSkeleton from './CustomerCardSkeleton';
import Alert from '../../../../../components/ui/Alert';

function LastWeekCustomersSection() {
  const { loading, data, error } = useOnLoadFetch('/moderator/get-last-week-customers');

  const lastWeekCustomers = data.items;

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-pro-50 p-4">
      <p>New customers this week</p>
      {loading ? (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          <CustomersCardSkeleton length={3} />
        </div>
      ) : error ? (
        <Alert.Error message={error} />
      ) : lastWeekCustomers.length === 0 ? (
        <p className="text-gray-800">No new customers this week</p>
      ) : ( 
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          {lastWeekCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LastWeekCustomersSection;
