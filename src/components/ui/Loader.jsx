import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

/**
 * `Loader` is a component that displays a loading spinner and a message in the center of the screen.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed below the spinner. Defaults to 'Just one second...'.
 * @returns {ReactElement} A div element that wraps the spinner and the message.
 */

function Loader({ message = 'Just one second...' }) {
  return (
    <div className="flex-center h-screen flex-col gap-6">
      <FontAwesomeIcon icon={icons.spinner} className="animate-spin-slow text-5xl text-pro-300" />
      <p className="text-xl text-gray-800">{message}</p>
    </div>
  );
}

export default Loader;
