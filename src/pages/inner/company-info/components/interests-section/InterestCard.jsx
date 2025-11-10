import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import useHover from '../../../../../hooks/useHover';
import useAuth from '../../../../../hooks/useAuth';
import icons from '../../../../../utils/faIcons';
import EditMode from './EditMode';
import DisableMode from './DisableMode';

export default function InterestCard({ interest }) {
  const { auth } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [disableMode, setDisableMode] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const element = useRef(null);

  useHover(
    element,
    () => setShowOptions(true),
    () => setShowOptions(false),
  );

  return (
    <div
      ref={element}
      className={`flex h-[75px] animate-fade-in-fast items-center justify-between rounded-xl bg-white shadow-sm`}
    >
      <div className="flex w-full items-center justify-between gap-2 p-3">
        {editMode ? (
          <EditMode interest={interest} setEditMode={setEditMode} />
        ) : disableMode ? (
          <DisableMode interest={interest} setDisableMode={setDisableMode} />
        ) : (
          <>
            <span
              className={`px-3 text-lg font-bold -tracking-wider ${interest.isDisabled ? 'text-gray-500' : 'text-gray-800'}`}
            >
              {interest.name}
            </span>
            {auth.roles.includes(roles.manager) &&
              showOptions &&
              (!interest.isDisabled ? (
                <div className="flex animate-fade-in-fast gap-2 px-1">
                  <button
                    title="Disable"
                    onClick={() => setDisableMode(true)}
                    className="btn-danger flex-center h-10 w-10 rounded-xl"
                  >
                    <FontAwesomeIcon icon={icons.eyeSlash} />
                  </button>
                  <button
                    title="Update"
                    onClick={() => setEditMode(true)}
                    className="btn-secondary flex-center h-10 w-10 rounded-xl"
                  >
                    <FontAwesomeIcon icon={icons.edit} />
                  </button>
                </div>
              ) : (
                <div className="flex animate-fade-in-fast gap-2 px-1">
                  <button
                    title="Enable"
                    onClick={() => setDisableMode(true)}
                    className="btn-secondary flex-center h-10 w-10 rounded-xl"
                  >
                    <FontAwesomeIcon icon={icons.eye} />
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
