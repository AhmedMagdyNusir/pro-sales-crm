import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

function GenderInput({ gender, setGender, className = '' }) {
  return (
    <div className={`flex w-full gap-2 ${className}`}>
      <Option value={1} label="Male" icon={icons.male} selected={gender} setSelected={setGender} />
      <Option value={2} label="Female" icon={icons.female} selected={gender} setSelected={setGender} />
      <Option value={0} label="N/A" icon={icons.ban} selected={gender} setSelected={setGender} />
    </div>
  );
}

export default GenderInput;

function Option({ value, label, icon, selected, setSelected }) {
  return (
    <button
      type="button"
      onClick={() => setSelected(value)}
      className={`flex-center flex-1 gap-2 rounded-xl border px-3 text-gray-500 transition-colors  ${selected === value ? ' bg-pro-300 text-white' : 'bg-white hover:bg-gray-100'}`}
    >
      <FontAwesomeIcon icon={icon} className="sm:text-xl" />
      {label}
    </button>
  );
}
