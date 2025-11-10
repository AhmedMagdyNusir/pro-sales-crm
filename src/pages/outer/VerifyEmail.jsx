import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { extractUserInfo, globalErrorMessage, paths } from '../../utils/utils';
import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/ui/InputField';
import email from '../../assets/email.svg';
import CenterBox from '../../components/ui/CenterBox';
import CaptionCard from '../../components/ui/CaptionCard';
import Form from '../../components/ui/Form';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function VerifyEmail() {
  useDocumentTitle('Verify Your Email');

  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!location.state?.email) return <Navigate to={`/${paths.login}`} replace={true} />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (error) setError('');
      setLoading(true);
      if (location.state?.purpose === 'ConfirmNewEmail') {
        let response = await axios({
          method: 'POST',
          url: '/auth/verify-code',
          data: { purpose: location.state.purpose, email: location.state.email, code },
          withCredentials: true,
        });
        setAuth(extractUserInfo(response.data));
      } else if (location.state?.purpose === 'ResetPassword') {
        let response = await axios({
          method: 'POST',
          url: '/auth/verify-code',
          data: { purpose: location.state.purpose, email: location.state.email, code },
        });
        navigate(`/${paths.resetPassword}`, { state: { email: location.state.email, token: response.data.token } });
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <CenterBox backButton className="flex-col">
      <CaptionCard image={email} title="Check your email" paragraph="Kindly enter the verification code we sent to you." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Verify"
        submitDisabled={code.length !== 6}
        className="sm:w-[475px] md:w-[575px]"
      >
        <InputField
          placeholder="Verification Code"
          className="text-center text-lg font-bold placeholder:font-normal"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
          autoFocus
        />
      </Form>
    </CenterBox>
  );
}

export default VerifyEmail;
