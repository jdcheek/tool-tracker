import React from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  pages,
}) => {
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
