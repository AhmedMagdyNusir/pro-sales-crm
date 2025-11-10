import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import DetailsSection from './components/details-section/Section';
import ActionsSection from './components/actions-section/Section';
import CustomerHeaderSection from './components/header-section/Section';
import Alert from '../../../components/ui/Alert';
import useAuth from '../../../hooks/useAuth';
import { roles } from '../../../utils/utils';

function Customer() {
  useDocumentTitle('Customer Details');

  const params = useParams();

  const { auth } = useAuth();

  const [editingMode, setEditingMode] = useState(false);

  const {
    loading: loadingDetails,
    data: details,
    setData: setDetails,
    error: detailsError,
  } = useOnLoadFetch(
    `/${auth.roles.includes(roles.moderator) ? 'moderator/get-customer' : 'SalesRep/GetCustomerAssignedToSales'}/${params.id}`,
  );
  const {
    loading: loadingActions,
    data: actionsData,
    setData: setActionsData,
    error: actionsError,
  } = useOnLoadFetch(
    `/${auth.roles.includes(roles.moderator) ? 'moderator/get-customer-actions' : 'SalesRep/ActionsForCustomersAssignedToSales'}/${params.id}`,
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <CustomerHeaderSection
        editingMode={editingMode}
        setEditingMode={setEditingMode}
        customer={details}
        setActions={setActionsData}
        error={(detailsError || actionsError) && (detailsError || actionsError)}
      />
      <div className="flex flex-1 flex-wrap gap-5">
        {detailsError || actionsError ? (
          <div className="w-full">
            <Alert.Error message={detailsError || actionsError} />
          </div>
        ) : (
          <>
            <DetailsSection
              loading={loadingDetails}
              customer={details}
              setCustomer={setDetails}
              editingMode={editingMode}
              setEditingMode={setEditingMode}
            />
            <ActionsSection loading={loadingActions} actions={actionsData} />
          </>
        )}
      </div>
    </div>
  );
}

export default Customer;
