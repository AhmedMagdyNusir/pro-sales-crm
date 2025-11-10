import { useEffect, useState } from 'react';

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  function updateOnlineStatus() {
    setOnline(navigator.onLine);
  }

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return online;
}

export default useOnlineStatus;
