import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage, layoutDimensions } from '../../../../utils/utils';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import InputField from '../../../../components/ui/InputField';
import Modal from '../../../../components/ui/Modal';
import Alert from '../../../../components/ui/Alert';
import icons from '../../../../utils/faIcons';
import useLogout from '../../../../hooks/useLogout';

function DeleteModal({ setDeletePopupOpen }) {
  const privateAxios = usePrivateAxios();

  const logout = useLogout();

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await privateAxios({ method: 'DELETE', url: '/UserProfile/delete-my-account', data: { password } });
      setLoading(false);
      setTimeout(() => logout(), 3500);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <Modal setOpen={setDeletePopupOpen} title="Delete Your Account" className="dimentions">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5">
        <p className="font-semibold">This action can't be undone.</p>
        <p>
          Are you sure you want to delete your account? This action is irreversible and will result in the permanent loss of
          all your data.
        </p>
        <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button
          type="submit"
          className="w-full rounded-xl bg-red-500 py-3 font-semibold  uppercase text-white transition-colors hover:bg-red-400 disabled:bg-red-400"
          disabled={!password || loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={icons.spinner} className="animate-spin-slow" />
          ) : (
            <span className="flex-center gap-2">
              <FontAwesomeIcon icon={icons.trash} />
              Delete
            </span>
          )}
        </button>
        {error && <Alert.Error message={error} />}
      </form>
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

export default DeleteModal;
