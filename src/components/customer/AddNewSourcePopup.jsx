import { useCallback, useEffect, useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { globalErrorMessage, layoutDimensions } from '../../utils/utils';
import Modal from '../ui/Modal';
import InputField from '../ui/InputField';
import icons from '../../utils/faIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import social from '../../assets/social.svg';
import Alert from '../ui/Alert';

function AddNewSourcePopup({ setNewSourcePopup, setSourcesOptions }) {
  const [name, setName] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const privateAxios = usePrivateAxios();

  const handleAddNewSource = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setError('');
        setSuccess(false);
        setLoading(true);
        const res = await privateAxios({ method: 'post', url: '/moderator/add-source', data: { name } });
        setSourcesOptions((prev) => [...prev, { id: res.data.id, name }]);
        setSuccess(true);
      } catch (error) {
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [name, privateAxios, setSourcesOptions],
  );

  // Add new source on Enter key press
  useEffect(() => {
    function handleEnterKey(event) {
      if (event.key === 'Enter') handleAddNewSource(event);
    }

    document.addEventListener('keydown', handleEnterKey);
    return () => document.removeEventListener('keydown', handleEnterKey);
  }, [handleAddNewSource]);

  return (
    <Modal setOpen={setNewSourcePopup} className="dimentions overflow-hidden rounded-xl shadow-xl">
      <div className="relative flex h-56 overflow-hidden bg-pro-200">
        <img src={social} alt="Sources" className="absolute left-0 top-0 scale-125" />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <p>Automatically deleted after one day, unused sources will be removed.</p>
        <div className="flex gap-3">
          <InputField
            type="text"
            icon={icons.source}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add New Source"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddNewSource}
            className="btn-primary rounded-xl px-4"
            disabled={loading || !name}
          >
            {loading ? <FontAwesomeIcon icon={icons.spinner} spin /> : 'Add'}
          </button>
        </div>
        {error && <Alert.Error message={error} />}
        {success && <Alert.Success message={`${name} source added successfully`} />}
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

export default AddNewSourcePopup;
