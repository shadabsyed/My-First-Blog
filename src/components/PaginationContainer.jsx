import React from "react";
import Pagination from "./Pagination";

function PaginationContainer({ totalPages, currentPage, onPageChange }) {
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}

export default PaginationContainer;
