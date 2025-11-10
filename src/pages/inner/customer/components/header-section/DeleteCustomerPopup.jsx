import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage, layoutDimensions, paths } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import Modal from '../../../../../components/ui/Modal';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';

function DeleteCustomerPopup({ setDeletePopupOpen }) {
  const privateAxios = usePrivateAxios();
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    try {
      setError('');
      setLoading(true);
      await privateAxios({ url: `/moderator/delete-customer/${params.id}`, method: 'Delete' });
      navigate(`/${paths.customers}`);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <Modal title="Delete Customer" setOpen={setDeletePopupOpen} className="dimentions overflow-hidden rounded-xl shadow-xl">
      <div className="flex flex-col gap-4 p-5">
        <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
        <button onClick={handleDelete} className="btn-danger rounded-xl px-4 py-2" disabled={loading}>
          {loading ? (
            <FontAwesomeIcon icon={icons.spinner} className="animate-spin-medium" />
          ) : (
            <span className="flex-center gap-2 font-semibold">
              <FontAwesomeIcon icon={icons.trash} />
              Delete
            </span>
          )}
        </button>
        {error && <Alert.Error message={error} />}
      </div>
      <style>
        {`
          .dimentions {
            margin: 0 ${layoutDimensions.mobileLayoutPadding}px !important;
            height: auto !important;
          }
        `}
      </style>
    </Modal>
  );
}

export default DeleteCustomerPopup;
