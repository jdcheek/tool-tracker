import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          paginate(currentPage - 1);
        }}
        href="!#"
      >
        {"<"}
      </button>
      {currentPage} of {totalItems}
      <button
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
