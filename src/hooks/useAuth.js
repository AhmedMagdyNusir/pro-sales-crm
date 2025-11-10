import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * `useAuth` is a custom hook that provides access to the `AuthContext`.
 * 
 * This hook is a shortcut for calling `useContext(AuthContext)`. It can be used in any functional component that needs to access the authentication context.
 * 
 * @returns {Object} The current context value for `AuthContext`.
 */

export default function useAuth() {
  return useContext(AuthContext);
}
