const buttonClasses = 'flex-center rounded-xl border px-4 py-2 text-sm text-pro-300 transition-colors hover:bg-gray-100';
const activeButtonClasses = 'bg-pro-300 text-white border-pro-300 hover:bg-pro-300 hover:text-white';
const disabledButtonClasses = 'disabled:text-gray-500 hover:bg-white';

function Pagination({ getPage, currentPage, totalPages, className }) {
  function nextPage() {
    if (currentPage < totalPages) getPage(currentPage + 1);
  }

  function previousPage() {
    if (currentPage > 1) getPage(currentPage - 1);
  }

  function firstPage() {
    getPage(1);
  }

  function lastPage() {
    getPage(totalPages);
  }

  return (
    <div className={`flex ${className}`}>
      {/* The previous page button option */}
      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className={`${buttonClasses} ${currentPage === 1 && disabledButtonClasses}`}
      >
        Previous
      </button>

      {/* Option for the first page if the current is greater than 2 */}
      {currentPage > 2 ? (
        <>
          <button onClick={firstPage} className={`${buttonClasses}`}>
            1
          </button>
          <button disabled className={`${buttonClasses} ${disabledButtonClasses}`}>
            ...
          </button>
        </>
      ) : null}

      {/* The previous page number option - Hidden in mobile devices */}
      {currentPage > 1 ? (
        <button onClick={previousPage} className={`${buttonClasses} hidden sm:block`}>
          {currentPage - 1}
        </button>
      ) : null}

      {/* The current active page */}
      <button className={`${buttonClasses} ${activeButtonClasses}`}>{currentPage}</button>

      {/* The next page number option - Hidden in mobile devices */}
      {currentPage < totalPages ? (
        <button onClick={nextPage} className={`${buttonClasses} hidden sm:block`}>
          {currentPage + 1}
        </button>
      ) : null}

      {/* Option for the last page if the current is smaller than totalPages - 1 */}
      {currentPage < totalPages - 1 ? (
        <>
          <button disabled className={`${buttonClasses} ${disabledButtonClasses}`}>
            ...
          </button>
          <button onClick={lastPage} className={`${buttonClasses}`}>
            {totalPages}
          </button>
        </>
      ) : null}

      {/* The next page button option */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`${buttonClasses} ${currentPage === totalPages && disabledButtonClasses}`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
