import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSentiment } from './sentiment-analysis/useSentiment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage } from '../../../../../../utils/utils';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import SentimentEmoji from './sentiment-analysis/SentimentEmoji';
import Form from '../../../../../../components/ui/Form';
import Alert from '../../../../../../components/ui/Alert';
import icons from '../../../../../../utils/faIcons';

function CallForm({ setSelectedType, setActions }) {
  const privateAxios = usePrivateAxios();

  const id = useParams().id;

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState(0);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sentiment = useSentiment(summary);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const { data } = await privateAxios({
        method: 'POST',
        url: '/SalesRep/AddCall',
        data: { customerId: +id, status, summary, date: new Date(), followUp: null },
      });
      setSuccess(true);
      // Backend issues: 1. The added action object returned in an array. 2. The type is not included in the object.
      // Let's fix this:
      const newCall = data[0];
      newCall.type = 'call';
      setActions((actions) => [...actions, newCall]);
    } catch (error) {
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitDisabled={loading || !summary}
      submitLabel="Add Action"
      className="animate-fade-in-fast p-5"
    >
      <div className="flex items-center gap-1">
        <button type="button" className="btn-light h-10 w-10 rounded-full" onClick={() => setSelectedType(null)}>
          <FontAwesomeIcon icon={icons.back} />
        </button>
        <h2 className="text-xl font-semibold">Add New Call</h2>
      </div>
      <div className="relative flex">
        <textarea
          placeholder="Summary"
          className="h-32 w-full resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          autoFocus
        />
        <SentimentEmoji sentiment={sentiment} />
      </div>

      <p>Call Status:</p>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        {['Completed', 'Missed', 'Cancelled', 'Busy', 'Failed'].map((statusName, index) => (
          <button
            type="button"
            key={statusName}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${index === status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatus(index)}
          >
            {statusName}
          </button>
        ))}
      </div>
      {success && <Alert.Success message="Action added successfully." />}
    </Form>
  );
}

export default CallForm;
