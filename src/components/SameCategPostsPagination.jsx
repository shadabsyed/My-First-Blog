import React from "react";

const SameCategPostsPagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  setCurrentPage,
}) => {
  return (
    <div className="nav-links">
      <button
        className="nav-btn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => {
            const difference = pageNumber - currentPage;

            if (pageNumber === currentPage) {
              return (
                <span key={pageNumber} className="current">
                  {pageNumber}
                </span>
              );
            } else if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (difference >= -2 && difference <= 2)
            ) {
              return (
                <button
                  key={pageNumber}
                  className="page-number-btn"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            } else if (difference === 3 && totalPages - currentPage > 3) {
              return (
                <span key={pageNumber} className="dots">
                  ...
                </span>
              );
            }
            return null;
          }
        )}
        {currentPage === 1 && totalPages > 1 && (
          <>
            <span className="dots">...</span>
            <button
              className="page-number-btn"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </span>

      <button
        className="nav-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default SameCategPostsPagination;
