import { Navigate } from 'react-router-dom';
import { roles } from '../../../utils/utils';
import useAuth from '../../../hooks/useAuth';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CustomersTable from '../../../components/customer/customersTable.jsx/CustomersTable';

function AssignedCustomers() {
  useDocumentTitle('Assigned Customers');

  const { auth } = useAuth();

  if (auth.roles.includes(roles.manager)) return <Navigate to="/" replace={true} />;

  return (
    <div className='flex flex-col gap-6'>
      <h1>Customers assigned to me</h1>
      <CustomersTable url='SalesRep/customers' />
    </div>
  );
}

export default AssignedCustomers;
