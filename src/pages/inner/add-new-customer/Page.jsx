import { breakboints } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CustomerForm from '../../../components/customer/CustomerForm';

function AddNewCustomer() {
  useDocumentTitle('Add New Customer');

  return (
    <div className="flex-center h-full animate-fade-in-fast">
      <CustomerForm
        className="form-shadow h-full w-full overflow-auto rounded-xl md:h-fit md:w-[650px] md:border md:p-8 lg:w-[800px]"
        title="Add New Customer"
        submitLabel="Add"
      />
      <style>
        {`
          @media (min-width: ${breakboints.md}) {
            .form-shadow {
              box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.05), 0 5px 10px 0 rgba(0, 0, 0, 0.1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AddNewCustomer;
