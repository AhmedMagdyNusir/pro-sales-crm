import { useState } from 'react';
import { globalErrorMessage } from '../../../../../../utils/utils';
import { validationRegex } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '../../../../../../components/ui/Alert';
import icons from '../../../../../../utils/faIcons';

export default function ChangingUsername() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();
  const [userNameUpdated, setUserNameUpdated] = useState(false);

  const [username, setUsername] = useState(auth.username);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUsername = validationRegex.username.test(username);

  async function handleUsernameSubmit(e) {
    e.preventDefault();
    if (isValidUsername) {
      if (username === auth.username) {
        setError('Please enter a different username');
        return;
      }
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-username',
          data: { username },
        });
        setAuth({ ...auth, username });
        setUserNameUpdated(true);
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

  if (userNameUpdated) {
    return <Alert.Success message="Username updated successfully!" />;
  }
  return (
    <div className="flex lg:gap-20 gap-1">
      <div className="flex lg:w-[400px]">
        <UserData icon={icons.username} title="Username" />
        <div className="lg:ml-28 lg:w-[190px] w-[150px] ml-4 mt-2 ">
          <InputField.Username
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isValid={isValidUsername}
            required
            error={error}

          />
        </div>
      </div>
      <div className="flex lg:w-[75px] w-[80px]">
        <Form
          onSubmit={handleUsernameSubmit}
          loading={loading}
         submitLabel="Update"
          submitDisabled={!isValidUsername || !username || loading}
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
        <p style={{ fontSize: '18px' }}>{title}</p>
      </div>
      <div className="text-gray-800" style={{ fontSize: '20px' }}>
        {value}
      </div>
    </div>
  );
}

