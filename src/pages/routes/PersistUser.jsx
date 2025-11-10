import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRefresh from '../../hooks/useRefresh';
import useLogout from '../../hooks/useLogout';
import Loader from '../../components/ui/Loader';

/**
 * `PersistUser` is a component that manages the user's authentication state when the app is loaded.
 * 
 * If the user has a 'persist' flag in local storage but no access token, it tries to refresh the access token.
 * If the refresh token is valid, it updates the auth state and re-renders the component.
 * If the refresh token is expired, it logs out the user and re-renders the component.
 * 
 * If the user has an access token or no 'persist' flag, it simply renders its children.
 * 
 * In Other Words:
 * 
 * if (!accessToken && persist) => this component will try to refresh the accessToken:
 *   - if the refreshToken is valid, the auth state will be updated (with the new accessToken) and thus the component will re-render.
 *   - else, the logout() will be called and it will:
 *        1. reset the auth state. Thus, the component will re-render.
 *        2. remove the persist flag from the local storage
 *        3. revoke the refreshToken
 *
 * else => the component will render the children.
 * 
 * @returns {ReactElement} A Loader component if the access token is being refreshed, or an Outlet component otherwise.
 */

function PersistUser() {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const persist = JSON.parse(localStorage.getItem('persist')) ?? false;
  const refreshAccessToken = useRefresh();
  const logout = useLogout();

  // in StrictMode, this component will be rendered twice causing the refreshAccessToken to be called twice.
  const effectHasRun = useRef(false);

  useEffect(() => {
    if (!accessToken && persist && !effectHasRun.current) {
      effectHasRun.current = true;
      (async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          logout();
        }
      })();
    }
  }, [accessToken, persist, refreshAccessToken, logout]);

  return !accessToken && persist ? <Loader /> : <Outlet />;
}

export default PersistUser;
