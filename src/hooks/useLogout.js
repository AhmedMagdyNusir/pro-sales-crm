import useAuth from './useAuth';
import axios from '../api/axios';

/**
 * `useLogout` is a custom hook that provides a function to log out the user.
 *
 * This hook uses the `useAuth` hook to get the `setAuth` function from the `AuthContext`.
 *
 * The `logout` function removes the 'persist' item from local storage, sends a request to the '/auth/revoke-token' endpoint to invalidate the user's token, and then calls `setAuth` with an empty object to update the authentication state.
 *
 * @returns {Function} The `logout` function.
 */

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      setAuth({});
      localStorage.removeItem('persist');
      await axios({ method: 'POST', url: '/auth/revoke-token', withCredentials: true });
    } catch (error) {}
  };

  return logout;
}

export default useLogout;
