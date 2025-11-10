import { createContext, useEffect, useState } from 'react';
import usePrivateAxios from '../hooks/usePrivateAxios';
import { globalErrorMessage } from '../utils/utils';

export const CompanyContext = createContext(null);

function CompanyProvider({ children }) {
  const [company, setCompany] = useState({
    data: {}, // { name, description }
    loading: true,
    error: '',
  });

  const privateAxios = usePrivateAxios();

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function fetchData() {
      try {
        const { data } = await privateAxios({ url: '/shared/get-business-info', signal: controller.signal });
        if (!canceled)
          setCompany({ data: { name: data.companyName, description: data.description }, loading: false, error: '' });
      } catch (error) {
        if (!canceled)
          setCompany({
            data: {},
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

  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>;
}

export default CompanyProvider;
