import { useState } from 'react';
import { extractUserInfo, globalErrorMessage } from '../../../../../../utils/utils';
import { validationRegex } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Alert from '../../../../../../components/ui/Alert';
import Form from '../../../../../../components/ui/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../utils/faIcons';

export default function ChangingEmail() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();

  const [verify, setVerify] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);

  const [email, setEmail] = useState(auth.email);
  const [code, setCode] = useState('');

  const isValidEmail = validationRegex.email.test(email);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (isValidEmail) {
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-email',
          data: { email },
        });
        setLoading(false);
        setVerify(true);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter valid email address ');
    }
  }

  async function handleVerfiySubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const { data } = await privateAxios({
        method: 'POST',
        url: '/Auth/verify-code',
        data: { email, code, purpose: 'ConfirmNewEmail' },
      });
      setAuth(extractUserInfo(data));
      setEmailUpdated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  if (emailUpdated) {
    return <Alert.Success message="Email updated successfully!" />;
  }

  return verify ? (
    <div className="flex  lg:gap-20 lg:flex-row flex-col">
      <div className="flex lg:w-[400px] ">
        <UserData icon={icons.email} title="Email" />
        <div className="lg:ml-20 lg:w-[270px] w-40 ml-11">
          <InputField
            className="text-center text-lg font-semibold placeholder:font-normal"
            type="text"
            value={code}
            placeholder="Verification Code"
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
            autoFocus
            error={error}

          />{' '}
        </div>
      </div>
      <div className="flex w-[65px] lg:w-[75px] ">
        <Form
          onSubmit={handleVerfiySubmit}
          loading={loading}
          submitLabel="Verify"
          submitDisabled={!(code.length === 6) || loading}
          className=" sm:w-[400px]"
        ></Form>
      </div>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row  lg:gap-20">
      <div className="flex lg:w-[400px]">
        <UserData icon={icons.email} title="Email" />
        <div className="ml-3 w-[270px] lg:ml-16 lg:w-[275px]">
          <InputField.Email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isValidEmail}
            required
            error={error}
          />
        </div>
      </div>
      <div className="flex w-[65px] lg:w-[75px] ">
        <Form
          onSubmit={handleEmailSubmit}
          loading={loading}
          submitLabel="Update"
          submitDisabled={!isValidEmail || !email || loading}
          className="  sm:w-[400px]"
        ></Form>
      </div>
    </div>
  );
}

function UserData({ icon, title, value }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={icon} />
        <p style={{ fontSize: '16px' }}>{title}</p>
      </div>
      <div className="text-gray-800" style={{ fontSize: '20px' }}>
        {value}
      </div>
    </div>
  );
}
