import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { breakboints } from '../../../../../utils/utils';
import CustomerPropertiesSkeleton from './CustomerPropertiesSkeleton';
import CustomerProperties from './CustomerProperties';
import CustomerEditingMode from './CustomerEditingMode';
import icons from '../../../../../utils/faIcons';

function DetailsSection({ loading, customer, setCustomer, editingMode, setEditingMode }) {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-xl border lg:max-w-[475px] lg:flex-1">
      <div className="relative mb-14 h-32 w-full bg-pro-50">
        <div className="flex-center absolute left-1/2 top-full -mt-[50px] h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-3xl text-pro-300" />
        </div>
      </div>
      <h2 className="text-center">
        {loading ? (
          <div className="mt-5 h-5 w-32 rounded-xl bg-pro-50"></div>
        ) : editingMode ? (
          'Editing Customer'
        ) : (
          `${customer.firstName} ${customer.lastName}`
        )}
      </h2>
      <div className="flex w-full flex-col gap-3 px-5 py-5 sm:px-8 sm:pb-8">
        {loading ? (
          <CustomerPropertiesSkeleton length={7} />
        ) : editingMode ? (
          <CustomerEditingMode customer={customer} setCustomer={setCustomer} setEditingMode={setEditingMode} />
        ) : (
          <CustomerProperties customer={customer} />
        )}
      </div>
      <style>
        {`
          @media (min-width:${breakboints.lg}) {
            .grow {
              flex-grow: 3;
              flex-shrink: 1;
              flex-basis: 0%;
            }
          } 
        `}
      </style>
    </div>
  );
}

export default DetailsSection;
