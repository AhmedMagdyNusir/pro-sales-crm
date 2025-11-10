import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';
import Alert from './Alert';

/**
 * `Form` is a component that has a submit button displaying a loading spinner during submission and an error message if one occurs.
 *
 * The component is divided into two main sections:
 * 1. The child elements, which are rendered inside the form.
 * 2. An `ErrorAlert` and a `submit button`, which are displayed below the child elements.
 *
 * The form is styled as a full-height and full-width flex container. The `justify-between` class is used to distribute the form's children evenly in the vertical direction. This distribution will be noticeable if you give the form (or its parent) a specific height.
 *
 * Additional CSS classes and other props can be passed to the component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.loading - Indicates whether the form is being submitted. If true, a loading spinner is displayed.
 * @param {string} props.error - An error message to display. If truthy, an `ErrorAlert` is displayed with this message.
 * @param {string} props.submitLabel - The label for the submit button.
 * @param {boolean} props.submitDisabled - Indicates whether the submit button should be disabled.
 * @param {ReactNode} props.children - The child elements to be rendered inside the form.
 * @returns {ReactElement} A form element that wraps the child elements, an `ErrorAlert`, and a submit button.
 */

function Form({ className = '', loading, error, submitLabel, submitDisabled, children, ...rest }) {
  return (
    <form className={'flex h-full w-full flex-col justify-between gap-3 ' + className} {...rest}>
      <div className="flex flex-col gap-3">{children}</div>
      <div className="flex flex-col gap-3">
        {error && <Alert.Error message={error} />}
        <button type="submit" className="btn-primary rounded-xl py-3 uppercase" disabled={submitDisabled || loading}>
          {loading ? <FontAwesomeIcon icon={icons.spinner} className="animate-spin-slow" /> : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default Form;
