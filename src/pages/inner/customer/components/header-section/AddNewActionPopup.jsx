import { useState } from 'react';
import { breakboints } from '../../../../../utils/utils';
import Modal from '../../../../../components/ui/Modal';
import CallForm from './actions-form/CallForm';
import MessageForm from './actions-form/MessageForm';
import MeetingForm from './actions-form/MeatingForm';
import DealForm from './actions-form/DealForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../utils/faIcons';

const types = ['Call', 'Message', 'Meeting', 'Deal'];

export default function AddNewActionPopup({ setAddNewActionPopupOpen, setActions }) {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <Modal title="Add New Action" setOpen={setAddNewActionPopupOpen} className="auto-height">
      {selectedType === null && (
        <div className="flex flex-col gap-4 p-4">
          <p>Select the type of action you want to add.</p>
          <div className="grid grid-cols-2 gap-3">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="flex-center flex-col gap-2 rounded-xl bg-gray-100 p-5 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={icons.actions[type.toLowerCase()]} className="text-xl" />
                <span className="text-sm font-semibold">{type}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="hiddena">
        {selectedType === 'Call' ? (
          <CallForm setSelectedType={setSelectedType} setActions={setActions} />
        ) : selectedType === 'Message' ? (
          <MessageForm setSelectedType={setSelectedType} setActions={setActions} />
        ) : selectedType === 'Meeting' ? (
          <MeetingForm setSelectedType={setSelectedType} setActions={setActions} />
        ) : selectedType === 'Deal' ? (
          <DealForm setSelectedType={setSelectedType} setActions={setActions} />
        ) : null}
      </div>

      <style>
        {`
          @media (min-width: ${breakboints.sm}) {
            .auto-height {
              height: auto !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}
