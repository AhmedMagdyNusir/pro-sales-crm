import { useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

function Modal({ title, setOpen, animationTime = 250, className, children }) {
  const screen = useRef(null);
  const box = useRef(null);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      setOpen(false);
    }, animationTime);
    box.current.style.animation = `half-pop-down ${+animationTime}ms`;
    screen.current.style.animation = `fade-out ${+animationTime}ms`;
    screen.current.style.opacity = `0`;
  }, [animationTime, setOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (box.current && !box.current.contains(event.target)) handleClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') handleClose();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  return (
    <div
      ref={screen}
      className="flex-center fixed left-0 top-0 z-40 h-full w-full bg-[#00000025] sm:bg-[#00000050]"
      style={{ animation: `fade-in ${animationTime}ms` }}
    >
      <div
        ref={box}
        className={`flex h-full w-full flex-col bg-white sm:h-[550px] sm:w-[500px] sm:rounded-xl sm:shadow-xl lg:w-[600px] ${className}`}
        style={{ animation: `half-pop-up ${animationTime}ms` }}
      >
        {title && (
          <header className="flex items-center justify-between border-b p-5">
            <h2 className="capitalize">{title}</h2>
            <button className="btn-light flex-center h-8 w-8 rounded-xl" onClick={handleClose}>
              <FontAwesomeIcon icon={icons.x} />
            </button>
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
