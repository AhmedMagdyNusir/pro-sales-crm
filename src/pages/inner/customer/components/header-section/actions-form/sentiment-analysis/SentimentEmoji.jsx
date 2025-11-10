import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../../utils/faIcons';

function SentimentEmoji({ sentiment }) {
  return sentiment === 'error' || sentiment === 'idle' ? null : (
    <span className="flex-center absolute bottom-2 right-2 gap-2 rounded-xl bg-white p-2 text-sm sm:text-lg">
      {sentiment === 'loading' && (
        <>
          <FontAwesomeIcon title="Analyzing..." icon={icons.spinner} spin className="text-gray-500" />
          <p>Analyzing...</p>
        </>
      )}
      {sentiment === 'Positive' && (
        <>
          <FontAwesomeIcon
            title="Positive"
            icon={icons.sentiment.positive}
            className="animate-fade-in-fast text-green-600"
          />
          <p>Positive</p>
        </>
      )}
      {sentiment === 'Negative' && (
        <>
          <FontAwesomeIcon title="Negative" icon={icons.sentiment.negative} className="animate-fade-in-fast text-red-500" />
          <p>Negative</p>
        </>
      )}
      {(sentiment === 'Neutral' || sentiment === 'Irrelevant') && (
        <>
          <FontAwesomeIcon title="Neutral" icon={icons.sentiment.neutral} className="animate-fade-in-fast text-orange-500" />
          <p>Neutral</p>
        </>
      )}
    </span>
  );
}

export default SentimentEmoji;
