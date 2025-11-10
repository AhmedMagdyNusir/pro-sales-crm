import { useState } from 'react';
import { applicationName, globalErrorMessage, paths } from '@utils/utils';
import { extractUserInfo } from '@utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '@hooks/useAuth';
import login from '@assets/login.svg';
import InputField from '@components/ui/InputField';
import Checkbox from '@components/ui/Checkbox';
import Form from '@components/ui/Form';
import AuthMaxBox from './components/AuthMaxBox';
import useDocumentTitle from '@hooks/useDocumentTitle';
import icons from '@utils/faIcons';

function Login() {
  useDocumentTitle(`${applicationName} | Login`);

  const { setAuth } = useAuth();

  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [persist, setPersist] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (identity && password) {
      try {
        if (error) setError('');
        setLoading(true);
        let response = await axios({
          method: 'POST',
          url: '/auth/login',
          data: { loginIdentifier: identity, password },
          withCredentials: true,
        });
        setAuth(extractUserInfo(response.data));
        persist && localStorage.setItem('persist', 'true');
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return (
    <AuthMaxBox
      image={login}
      title="Welcome back!"
      subTitle="Please enter your credentials to proceed."
      leave={{ hint: "Don't have an account?", link: `/${paths.register}`, label: 'Register Here' }}
    >
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Login"
        submitDisabled={!identity || !password}
        className="sm:w-[500px] xl:h-[405px] xl:overflow-auto"
      >
        <InputField
          placeholder="Username or Email"
          type="text"
          icon={icons.user}
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          maxLength={50}
          required
          autoFocus
        />
        <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="flex flex-wrap justify-between gap-2 px-1">
          <Checkbox label="Remember me" checked={persist} onClick={() => setPersist(!persist)} />
          <Link to={`/${paths.forgotPassword}`} className="hover:text-pro-200">
            Forgot your password?
          </Link>
        </div>
      </Form>
    </AuthMaxBox>
  );
}

export default Login;
