import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import useAuth from '../../../../../hooks/useAuth';
import DeleteCustomerPopup from './DeleteCustomerPopup';
import AddNewActionPopup from './AddNewActionPopup';
import icons from '../../../../../utils/faIcons';

function CustomerHeaderSection({ editingMode, setEditingMode, customer, setActions, error }) {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [addNewActionPopupOpen, setAddNewActionPopupOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex-center gap-2">
        <button
          onClick={() => navigate(-1)}
          // onClick={() => navigate(`/${paths.customers}`)}
          className="h-10 w-10 rounded-full text-xl text-gray-800 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={icons.back} />
        </button>
        <h1>Customer Details</h1>
      </div>
      {!error && (
        <div className="flex gap-2">
          {auth.id === customer.salesRepresentative?.id && (
            <>
              <button
                onClick={() => setAddNewActionPopupOpen(true)}
                className={`flex-center animate-fade-in-medium gap-2 rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 shadow transition-colors hover:bg-green-200 sm:text-base`}
              >
                <>
                  <FontAwesomeIcon icon={icons.plus} />
                  <span>New Action</span>
                </>
              </button>
              {addNewActionPopupOpen && <AddNewActionPopup setAddNewActionPopupOpen={setAddNewActionPopupOpen} setActions={setActions} />}
            </>
          )}
          {auth.roles.includes(roles.moderator) && editingMode && (
            <>
              <button
                className="btn-danger flex-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base"
                onClick={() => setDeletePopupOpen(true)}
              >
                <FontAwesomeIcon icon={icons.trash} />
                Delete Customer
              </button>
              {deletePopupOpen && <DeleteCustomerPopup setDeletePopupOpen={setDeletePopupOpen} />}
            </>
          )}
          {auth.roles.includes(roles.moderator) && (
            <button
              onClick={() => setEditingMode(!editingMode)}
              className={`flex-center animate-fade-in-medium gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base ${editingMode ? 'btn-secondary' : 'btn-primary '}`}
            >
              <FontAwesomeIcon icon={editingMode ? icons.x : icons.edit} />
              {editingMode ? 'Cancel Editing' : 'Edit'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerHeaderSection;
