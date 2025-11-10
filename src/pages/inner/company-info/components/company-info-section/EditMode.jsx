import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage } from '../../../../../utils/utils';
import useCompany from '../../../../../hooks/useCompany';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import InputField from '../../../../../components/ui/InputField';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';

export default function EditMode({ setEditMode }) {
  const { company, setCompany } = useCompany();

  const privateAxios = usePrivateAxios();

  const [name, setName] = useState(company.data.name);
  const [description, setDescription] = useState(company.data.description);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    if (name) {
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/manager/update-business-info',
          data: { companyName: name, description },
        });
        setCompany({ data: { name, description }, loading: false, error: '' });
        setEditMode(false);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return (
    <form onSubmit={handleUpdate} className={`flex flex-col gap-3 transition-opacity ${loading ? 'opacity-75' : ''}`}>
      <InputField
        placeholder="Company Name (Required)"
        className="p-6 text-xl font-bold sm:text-3xl "
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <textarea
        placeholder="Description (Optional)"
        className="h-48 resize-none rounded-xl border-none bg-gray-100 p-6 text-sm text-gray-800 outline-none sm:text-base"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      {error && <Alert.Error message={error} />}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="btn-primary flex-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold sm:text-sm"
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
          className="flex-center gap-2 rounded-xl bg-gray-100 p-3 px-5 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
        >
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
}
