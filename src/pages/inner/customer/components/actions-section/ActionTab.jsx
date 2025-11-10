function ActionsTab({ tab, isActive, onClick }) {
  return (
    <button
      className={`w-full text-nowrap p-3 text-center text-xs font-medium transition-colors sm:text-sm ${isActive ? 'bg-pro-300 text-white' : 'border-pro-50 text-gray-500 hover:text-pro-300'}`}
      onClick={onClick}
    >
      {tab.title}
    </button>
  );
}

export default ActionsTab;
