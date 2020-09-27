import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        disabled={currentPage <= 1}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage - 1);
        }}
        href="!#"
      >
        {"<"}
      </button>
      {currentPage} of {pages}
      <button
        disabled={currentPage === pages}
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage + 1);
        }}
        href="!#"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
