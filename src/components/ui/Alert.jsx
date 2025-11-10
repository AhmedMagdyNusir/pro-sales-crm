import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

function Alert({ message, icon, colors = 'bg-gray-100 text-gray-500' }) {
  return (
    <div className={`flex animate-fade-in-fast items-center gap-3 rounded-xl px-4 py-3 text-sm ${colors}`}>
      <FontAwesomeIcon icon={icon} className="self-start pt-1" />
      <div>{message}</div>
    </div>
  );
}

export default Alert;

Alert.Error = function Error({ message = 'An error occurred' }) {
  return <Alert message={message} icon={icons.exclamationCircle} colors="bg-red-100 text-red-500" />;
};

Alert.Success = function Success({ message = 'Success' }) {
  return <Alert message={message} icon={icons.checkCircle} colors="bg-green-100 text-green-600" />;
};
