import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import useInterests from '../../../../../hooks/useInterests';
import icons from '../../../../../utils/faIcons';

function EditMode({ interest, setEditMode }) {
  const privateAxios = usePrivateAxios();

  const { setInterests } = useInterests();

  const [name, setName] = useState(interest.name);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setError('');
        setLoading(true);
        const res = await privateAxios({
          method: 'put',
          url: '/manager/update-interest',
          data: { id: interest.id, name, isDisabled: interest.isDisabled },
        });
        setInterests((prev) => {
          const prevEnabled = prev.data.enabled;
          prevEnabled[prevEnabled.findIndex((prevInterest) => prevInterest.id === interest.id)] = res.data;
          return {
            data: { disabled: prev.data.disabled, enabled: prevEnabled },
            loading: false,
            error: '',
          };
        });
        setEditMode(false);
      } catch (error) {
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [privateAxios, interest.id, interest.isDisabled, name, setEditMode, setInterests],
  );

  // On Enter key press
  useEffect(() => {
    function handleEnterKey(event) {
      if (event.key === 'Enter') handleUpdate(event);
    }

    document.addEventListener('keydown', handleEnterKey);
    return () => document.removeEventListener('keydown', handleEnterKey);
  }, [handleUpdate]);

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Interest Name"
        className="flex-1 px-3 text-sm font-bold text-gray-800 outline-none placeholder:font-normal sm:text-base"
        autoFocus
        size={1}
      />

      <div className="flex gap-2">
        {error && (
          <div title={error} className="flex-center h-10 rounded-xl bg-red-100 px-4 text-sm text-red-500">
            <FontAwesomeIcon icon={icons.exclamationCircle} />
          </div>
        )}
        <button
          onClick={handleUpdate}
          className="btn-secondary flex-center h-10 gap-2 rounded-xl px-3 text-xs font-semibold sm:px-4 sm:text-sm"
          disabled={loading || !name}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={icons.spinner} spin />
              <span>Updating</span>
            </>
          ) : (
            <span>Update</span>
          )}
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="flex-center h-10 rounded-xl bg-gray-100 px-3 text-xs text-gray-500 hover:bg-gray-200 sm:px-4 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditMode;
