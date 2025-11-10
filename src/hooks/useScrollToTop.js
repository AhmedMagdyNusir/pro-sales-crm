import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This custom hook scrolls the window to the top whenever the current pathname changes.
 * It uses the `useLocation` hook from `react-router-dom` to get the current pathname,
 * and the `useEffect` hook to perform the side effect of scrolling to the top.
 * The scrolling effect is instant.
 */

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'instant' });
  }, [pathname]);
}

export default useScrollToTop;
