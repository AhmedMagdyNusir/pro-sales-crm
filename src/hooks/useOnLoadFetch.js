import { useState, useEffect } from 'react';
import { globalErrorMessage } from '../utils/utils';
import usePrivateAxios from './usePrivateAxios';

function useOnLoadFetch(url) {
  const privateAxios = usePrivateAxios();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function fetchData() {
      try {
        const { data } = await privateAxios({ url, signal: controller.signal });
        if (!canceled) setData(data);
      } catch (error) {
        if (!canceled) setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [url, privateAxios]);

  return { loading, data, error, setLoading, setData, setError };
}

export default useOnLoadFetch;
