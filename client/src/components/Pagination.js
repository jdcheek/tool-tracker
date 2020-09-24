import React from "react";

const Pagination = ({ itemsPerPage, totalItems }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);
  return (
    <div>
      <p>Test</p>
      {pageNumbers.map((num) => {
        <p key={num}>{num}</p>;
      })}
    </div>
  );
};

export default Pagination;
