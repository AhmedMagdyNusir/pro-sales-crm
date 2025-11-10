import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, getCallStatus } from '../../../../../utils/utils';
import useHover from '../../../../../hooks/useHover';
import InterestBadge from '../../../../../components/global/InterestBadge';
import icons from '../../../../../utils/faIcons';

function getActionIcon(type) {
  const iconClasses = `flex-center h-10 w-10 rounded-full`;
  switch (type) {
    case 'call':
      return (
        <div className={`${iconClasses} bg-blue-50 text-blue-300`}>
          <FontAwesomeIcon icon={icons.actions.call} />
        </div>
      );
    case 'message':
      return (
        <div className={`${iconClasses} bg-red-50 text-red-300`}>
          <FontAwesomeIcon icon={icons.actions.message} />
        </div>
      );
    case 'meeting':
      return (
        <div className={`${iconClasses} bg-indigo-50 text-indigo-300`}>
          <FontAwesomeIcon icon={icons.actions.meeting} />
        </div>
      );
    case 'deal':
      return (
        <div className={`${iconClasses} bg-green-50 text-green-300`}>
          <FontAwesomeIcon icon={icons.actions.deal} />
        </div>
      );
    default:
      return <div className={`${iconClasses} bg-gray-50 text-gray-300`}></div>;
  }
}

// Task: This component needs to be refactored
// - To read all data according to the action type
// - To allow editing of the action
// - To allow deleting of the action

function Action({ action }) {
  const [showEdit, setShowEdit] = useState(false);
  const element = useRef(null);

  useHover(
    element,
    () => setShowEdit(true),
    () => setShowEdit(false),
  );

  return (
    <div ref={element} className="mb-10 flex gap-4">
      <div className="relative">
        {getActionIcon(action.type)}
        <div className="absolute left-1/2 h-full w-0 -translate-x-1/2 transform border border-dashed"></div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-base">
                {action.type === 'call'
                  ? 'Call'
                  : action.type === 'message'
                    ? 'Message'
                    : action.type === 'meeting'
                      ? 'Meeting'
                      : 'Deal'}
              </h3>
              {action.type === 'meeting' && (
                <p className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-500 sm:text-sm">
                  {action.online ? 'Online' : 'Physical'}
                </p>
              )}
              {action.type === 'deal' && (
                <InterestBadge interest={`${action.interest.name} - ${action.price}$`} colorId={3} />
              )}
              {action.type === 'call' && (
                <p className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-500 sm:text-sm">
                  {getCallStatus(action.status)}
                </p>
              )}
            </div>
            <p className="text-xs sm:text-sm">{formatDate(new Date(action.date), true, true)}</p>
          </div>

          <div>
            {false && showEdit && (
              <button className="btn-light flex-center animate-fade-in-medium gap-2 rounded-xl px-4 py-2 text-sm">
                <FontAwesomeIcon icon={icons.edit} />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
        <p className="mb-2 mt-4 rounded-xl bg-gray-50 p-3 px-4">{action.summary}</p>
        {action.followUp && (
          <p className="flex justify-end gap-1 text-sm">
            Follow up on
            <span className="font-medium">{formatDate(new Date(action.followUp), false, true)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Action;
