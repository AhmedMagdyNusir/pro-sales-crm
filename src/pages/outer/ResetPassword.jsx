import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage, paths } from '../../utils/utils';
import { inputFieldsInstructions, validationRegex } from '../../utils/validation';
import axios from '../../api/axios';
import InputField from '../../components/ui/InputField';
import success from '../../assets/success.svg';
import CenterBox from '../../components/ui/CenterBox';
import CaptionCard from '../../components/ui/CaptionCard';
import Form from '../../components/ui/Form';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function ResetPassword() {
  useDocumentTitle('Reset Your Password');

  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidPassword = validationRegex.password.test(password);
  const isValidConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!location.state?.email || !location.state?.token) return <Navigate to={`/${paths.login}`} replace={true} />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValidPassword && isValidConfirmPassword) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({
          method: 'POST',
          url: '/auth/reset-password',
          data: {
            token: location.state?.token,
            email: location.state?.email,
            password,
            confirmPassword,
          },
        });
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate(`/${paths.login}`, { state: null }), 3500);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields correctly');
    }
  }

  return success ? (
    <SuccessMessage />
  ) : (
    <CenterBox className="flex-col">
      <CaptionCard title="Hello again!" paragraph="Please choose your new password." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Reset"
        submitDisabled={!isValidPassword || !isValidConfirmPassword}
        className="sm:w-[475px] md:w-[575px]"
      >
        <InputField.Password
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isValid={isValidPassword}
          required
          autoFocus
        />
        <InputField.Password
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          instructions={inputFieldsInstructions.confirmPassword}
          isValid={isValidConfirmPassword}
          required
        />
      </Form>
    </CenterBox>
  );
}

export default ResetPassword;

function SuccessMessage() {
  return (
    <CenterBox className="flex-center">
      <CaptionCard
        image={success}
        title="Password reset successfully"
        paragraph="Now you can login with your new password."
        className="px-10"
      />
    </CenterBox>
  );
}
