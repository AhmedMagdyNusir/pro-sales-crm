import { createContext, useEffect, useState } from 'react';
import usePrivateAxios from '../hooks/usePrivateAxios';
import { globalErrorMessage } from '../utils/utils';

export const InterestsContext = createContext(null);

export default function InterestsProvider({ children }) {
  const [interests, setInterests] = useState({ data: {}, loading: true, error: '' });

  const privateAxios = usePrivateAxios();

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function fetchData() {
      try {
        const { data } = await privateAxios({ url: '/shared/get-all-interests', signal: controller.signal });
        const enabled = data.filter((interest) => !interest.isDisabled);
        const disabled = data.filter((interest) => interest.isDisabled);
        if (!canceled) setInterests({ data: { enabled, disabled }, loading: false, error: '' });
      } catch (error) {
        if (!canceled)
          setInterests({
            data: [],
            loading: false,
            error: (error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage,
          });
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios]);

  return <InterestsContext.Provider value={{ interests, setInterests }}>{children}</InterestsContext.Provider>;
}
