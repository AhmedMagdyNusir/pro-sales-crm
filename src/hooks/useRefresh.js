import { extractUserInfo } from '../utils/utils';
import axios from '../api/axios';
import useAuth from './useAuth';

/**
 * `useRefresh` is a custom hook that provides a function to refresh the access token.
 *
 * This hook uses the `useAuth` hook to get the `setAuth` function from the `AuthContext`.
 *
 * The `refreshAccessToken` function sends a request to the '/Auth/refresh-token' endpoint to get a new access token. It then calls `setAuth` with the new token to update the authentication state.
 *
 * @returns {Function} The `refreshAccessToken` function.
 */

function useRefresh() {
  const { setAuth } = useAuth();

  const refreshAccessToken = async () => {
    const { data } = await axios({ url: '/Auth/refresh-token', withCredentials: true });
    setAuth(extractUserInfo(data));
    return data;
  };

  return refreshAccessToken;
}

export default useRefresh;
