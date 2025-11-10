import useDocumentTitle from '../../../hooks/useDocumentTitle';
import AllCustomersHeaderSection from './components/header-section/Section';
import LastWeekCustomersSection from './components/last-week-customers-section/Section';
import CustomersTable from '../../../components/customer/customersTable.jsx/CustomersTable';

function Customers() {
  useDocumentTitle('All Customers');

  return (
    <div className="flex flex-col gap-6">
      <AllCustomersHeaderSection />
      <LastWeekCustomersSection />
      <CustomersTable url="moderator/get-customers" />
    </div>
  );
}

export default Customers;
