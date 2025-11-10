import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

function DropdownMenu({
  icon,
  options = [],
  setOptions,
  loadingOptions,
  selected,
  setSelected,
  defaultQuery = '',
  className = '',
  ...rest
}) {
  const element = useRef(null);

  const [query, setQuery] = useState(defaultQuery);
  const [openMenu, setOpenMenu] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  let filteredOptions = options;

  // Filter options based on query
  if (query) filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          const selectedOption = filteredOptions[highlightedIndex];
          setQuery(selectedOption.label);
          setSelected(selectedOption.value);
          setOpenMenu(false);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setOpenMenu(false);
        break;
      default:
        break;
    }
  };

  // Set selected value if query matches an option
  useEffect(() => {
    if (query) {
      const matchingOption = options.find((option) => query.toLowerCase() === option.label.toLowerCase());
      if (matchingOption) {
        setSelected(matchingOption.value);
        setQuery(matchingOption.label);
      } else setSelected('');
    }
  }, [query, options, setSelected]);

  // Close menu when clicked outside
  useEffect(() => {
    function handleClickOutsideElement(event) {
      if (element.current && !element.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideElement);
    return () => document.removeEventListener('mousedown', handleClickOutsideElement);
  }, [element]);

  return (
    <div ref={element} className="relative w-full">
      <div className="flex items-center overflow-hidden rounded-xl bg-gray-100">
        {icon && <FontAwesomeIcon icon={icon} className="pl-3 text-gray-500" />}
        <input
          className={`flex-1 bg-inherit p-3 text-gray-800 outline-none placeholder:text-gray-500 ${className}`}
          value={query}
          onChange={(e) => {
            setOpenMenu(true);
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          size={1}
          {...rest}
        />
        {selected ? (
          <div className="flex-center gap-2">
            <span>
              <FontAwesomeIcon icon={icons.check} className="text-green-500" />
            </span>
            <MenuButton
              onClick={() => {
                setQuery('');
                setSelected('');
              }}
            >
              <FontAwesomeIcon icon={icons.x} />
            </MenuButton>
          </div>
        ) : (
          <MenuButton onClick={() => setOpenMenu(!openMenu)}>
            <FontAwesomeIcon icon={openMenu ? icons.angleUp : icons.angleDown} />
          </MenuButton>
        )}
      </div>

      {openMenu && (
        <div className="absolute top-full z-50 max-h-[200px] w-full cursor-default overflow-auto rounded-xl border bg-white py-3 text-gray-800 shadow-md placeholder:text-gray-500">
          {loadingOptions ? (
            <div className="p-2 px-4 text-sm text-gray-500">Loading Options...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-2 px-4 text-sm text-gray-500">No options matched</div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={`selection-none cursor-pointer border-l-4 p-2 px-4 transition-colors hover:border-pro-300 hover:bg-pro-50 ${index === highlightedIndex ? 'border-pro-300 bg-pro-50' : 'border-transparent'}`}
                onClick={() => {
                  setQuery(option.label);
                  setSelected(option.value);
                  setOpenMenu(false);
                }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

function MenuButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="flex-center mr-3 h-7 w-7 rounded-full bg-gray-200 text-xs text-gray-500 transition-colors hover:bg-gray-300"
      {...rest}
    >
      {children}
    </button>
  );
}
