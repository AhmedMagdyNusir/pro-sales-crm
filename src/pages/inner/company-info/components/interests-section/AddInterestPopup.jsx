import { useState } from 'react';
import { globalErrorMessage, layoutDimensions } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import useInterests from '../../../../../hooks/useInterests';
import Modal from '../../../../../components/ui/Modal';
import Form from '../../../../../components/ui/Form';
import InputField from '../../../../../components/ui/InputField';
import Alert from '../../../../../components/ui/Alert';

function AddInterestPopup({ setOpen }) {
  const { setInterests } = useInterests();

  const privateAxios = usePrivateAxios();

  const [input, setInput] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setSuccess(false);
      setLoading(true);
      const res = await privateAxios({ method: 'post', url: '/manager/add-interest', data: { name: input } });
      setInterests((prev) => {
        return {
          data: { disabled: prev.data.disabled, enabled: [...prev.data.enabled, res.data] },
          loading: false,
          error: '',
        };
      });
      setSuccess(true);
    } catch (error) {
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Add New Interest" setOpen={setOpen} className="dimentions rounded-xl">
      <Form
        className="p-5"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Add"
        submitDisabled={loading || !input}
      >
        <InputField placeholder="Interest Name" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
        {success && <Alert.Success message={`${input} added successfully`} />}
      </Form>
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

export default AddInterestPopup;
