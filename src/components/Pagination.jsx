import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (element, index) => index + 1
  );
  return (
    <nav aria-label="Page navigation example" className="nav-cont">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li className="page-item" key={pageNumber}>
            <button
              className={`page-link ${
                pageNumber === currentPage ? "active" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
