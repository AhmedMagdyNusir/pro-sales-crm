import icons from '../../utils/faIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inputFieldsInstructions } from '../../utils/validation';
import Alert from './Alert';

/**
 * `InputField` is a general input field component that can be used for all types of inputs.
 *
 * It displays an icon (if provided) and an input field. If the input field fails validation, it also displays a validation error message.
 *
 * @param {Object} props - The properties passed to an `input` field.
 * @param {Object} props.icon - The Font Awesome icon to be displayed before the input field.
 * @param {boolean} props.isValid - Indicates the validation status of the input field. If `false`, the `instructions` text is displayed as an error message.
 * @param {string} props.instructions - The validation error message to be displayed when `isValid` is `false`.
 * @param {string} props.error - An error message to display. If truthy, an `ErrorAlert` is displayed with this message.
 * @returns {ReactElement} A div element that wraps the input field and the validation error message.
 */

function InputField({ icon, value, error, isValid, instructions, className = '', ...rest }) {
  return (
    <div className="w-full">
      <div className="flex items-center overflow-hidden rounded-xl bg-gray-100 ">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={(value && isValid ? 'text-pro-300' : 'text-gray-500') + ' pl-3 transition-colors duration-1000'}
          />
        )}

        <input
          className={'flex-1 bg-inherit p-3 text-gray-800 outline-none placeholder:text-gray-500 ' + className}
          value={value}
          size={1}
          {...rest}
        />
      </div>

      {isValid !== undefined && value && !isValid && (
        <div className="flex flex-col gap-1 py-1">
          <div className="h-[3px] animate-progress-fast rounded bg-red-500"></div>
          <div className="animate-fade-in-fast text-sm text-red-500">{instructions}</div>
        </div>
      )}
      {error && (
        <div className="mt-1">
          <Alert.Error message={error} />
        </div>
      )}
    </div>
  );
}

export default InputField;

/**
 * `InputField.Name` is a specific type of `InputField` for name inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for name inputs.
 */
InputField.Name = function Name({ ...rest }) {
  return (
    <InputField
      type="text"
      icon={icons.user}
      placeholder="Name"
      instructions={inputFieldsInstructions.name}
      maxLength={18}
      {...rest}
    />
  );
};

/**
 * `InputField.FirstName` is a specific type of `InputField` for first name inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for first name inputs.
 */
InputField.FirstName = function FirstName({ ...rest }) {
  return <InputField.Name placeholder="First Name" {...rest} />;
};

/**
 * `InputField.LastName` is a specific type of `InputField` for last name inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for last name inputs.
 */
InputField.LastName = function LastName({ ...rest }) {
  return <InputField.Name placeholder="Last Name" {...rest} />;
};

/**
 * `InputField.Username` is a specific type of `InputField` for username inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for username inputs.
 */
InputField.Username = function Username({ ...rest }) {
  return (
    <InputField
      type="text"
      icon={icons.username}
      placeholder="Username"
      instructions={inputFieldsInstructions.username}
      maxLength={18}
      {...rest}
    />
  );
};

/**
 * `InputField.Email` is a specific type of `InputField` for email inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `50` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for email inputs.
 */
InputField.Email = function Email({ ...rest }) {
  return (
    <InputField
      type="text" // replaced to text due to validation factors
      icon={icons.email}
      placeholder="Email"
      instructions={inputFieldsInstructions.email}
      maxLength={50}
      {...rest}
    />
  );
};

/**
 * `InputField.Password` is a specific type of `InputField` for password inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `32` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for password inputs.
 */
InputField.Password = function Password({ ...rest }) {
  return (
    <InputField
      type="password"
      icon={icons.password}
      placeholder="Password"
      instructions={inputFieldsInstructions.password}
      maxLength={32}
      {...rest}
    />
  );
};

/**
 * `InputField.Phone` is a specific type of `InputField` for phone inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for phone inputs.
 */
InputField.Phone = function Phone({ ...rest }) {
  return <InputField type="tel" icon={icons.phone} placeholder="Phone" maxLength={18} {...rest} />;
};

/**
 * `InputField.City` is a specific type of `InputField` for city inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `32` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for city inputs.
 */
InputField.City = function City({ ...rest }) {
  return <InputField type="text" icon={icons.city} placeholder="City" maxLength={32} {...rest} />;
};

/**
 * `InputField.Age` is a specific type of `InputField` for age inputs.
 * You don't need to pass props like `type`, `icon`, `placehoder`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `3` by default.
 *
 * @param {Object} props The properties passed to the `InputField` component
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for age inputs.
 */
InputField.Age = function Age({ ...rest }) {
  return <InputField type="text" icon={icons.age} placeholder="Age" maxLength={3} {...rest} />;
};
