import { useEffect } from 'react';

function useHover(element, onHover, onLeave) {
  useEffect(() => {
    const actionElement = element.current;

    if (actionElement) {
      actionElement.addEventListener('mouseenter', onHover);
      actionElement.addEventListener('mouseleave', onLeave);
      return () => {
        actionElement.removeEventListener('mouseenter', onHover);
        actionElement.removeEventListener('mouseleave', onLeave);
      };
    }
  }, [element, onHover, onLeave]);
}

export default useHover;
