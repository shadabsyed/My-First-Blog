import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageLinks = () => {
    const pageLinks = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      if (pageNumber === currentPage) {
        pageLinks.push(
          <span key={pageNumber} className="page-numbers current">
            {pageNumber}
          </span>
        );
      } else if (
        pageNumber === 1 ||
        pageNumber === totalPages ||
        (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
      ) {
        pageLinks.push(
          <Link
            key={pageNumber}
            to={`/page/${pageNumber}/`}
            className="page-numbers"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Link>
        );
      } else if (pageLinks[pageLinks.length - 1].key !== "dots") {
        pageLinks.push(
          <span key="dots" className="page-numbers dots">
            …
          </span>
        );
      }
    }

    return pageLinks;
  };

  return (
    <nav aria-label="Page navigation example" className="nav-cont">
      <div className="nav-links">
        <button
          className="nav-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
        >
          Prev
        </button>
        {getPageLinks()}
        <button
          className="nav-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
