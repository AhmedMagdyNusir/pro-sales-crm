import { useState } from 'react';
import { validationRegex } from '../../../../../../utils/validation';
import { globalErrorMessage } from '../../../../../../utils/utils';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';
import icons from '../../../../../../utils/faIcons';
import Alert from '../../../../../../components/ui/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ChangingName() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();
  const [nameUpdated, setNameUpdated] = useState(false);

  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidFirstName = validationRegex.name.test(firstName);
  const isValidLastName = validationRegex.name.test(lastName);

  async function handleNameSubmit(e) {
    e.preventDefault();
    if (isValidFirstName && isValidLastName) {
      if (firstName === auth.firstName && lastName === auth.lastName) {
        setError('Please enter a different name');
        return;
      }
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-name',
          data: { firstName, lastName },
        });
        setAuth({ ...auth, firstName, lastName });
        setNameUpdated(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter valid information');
    }
  }

  if (nameUpdated) {
    return <Alert.Success message="Name updated successfully!" />;
  }

  return (
    <div className="flex lg:gap-20 gap-1">
      <div>
        <div className="flex  lg:mb-4 lg:w-[400px] mb-2">
          <UserData icon={icons.user} title="First Name" />
          <div className="lg:ml-32 lg:w-[170px] ml-4 w-[160px]">
            <InputField.FirstName
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isValid={isValidFirstName}
              required

            />
          </div>
        </div>
        <div className="flex  lg:w-[400px] ">
          <UserData icon={icons.user} title="Last Name" />{' '}
          <div className="lg:ml-32 lg:w-[170px] ml-4 w-[160px]">
            <InputField.LastName
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isValid={isValidLastName}
              required
              error={error}
            />
          </div>
        </div>
      </div>
        <div className="flex lg:w-[75px] w-[65px] lg:h-[80px] lg:flex-row flex-col mb-7 ">
          <Form
            onSubmit={handleNameSubmit}
            loading={loading}
            submitLabel="Update"
            submitDisabled={!isValidFirstName || !isValidLastName || loading}
            className=" sm:w-[400px]"
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
        <p>{title}</p>
      </div>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}
