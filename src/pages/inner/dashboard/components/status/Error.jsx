import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../utils/faIcons';

export default function Error() {
  return (
    <div className="flex-center h-full w-full rounded-xl bg-gray-100">
      <div className="flex flex-col gap-4">
        <FontAwesomeIcon icon={icons.exclamationCircle} className="text-xl text-gray-500 sm:text-3xl" />
        <span className="text-center text-sm text-gray-500 sm:text-base">Error generating report</span>
      </div>
    </div>
  );
}
