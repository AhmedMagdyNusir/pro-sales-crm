import { useEffect } from 'react';
import { applicationName } from '../utils/utils';

function useDocumentTitle(title, defaultTitle = applicationName) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
}

export default useDocumentTitle;
