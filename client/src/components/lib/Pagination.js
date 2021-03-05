import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  setItemsPerPage,
  paginate,
  currentPage,
  pages,
}) => {
  const setPaginateToInnerText = (e) => {
    paginate(parseInt(e.target.innerText));
  };

  return (
    <div className='footer'>
      <Pagination>
        <Pagination.First
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        />
        <Pagination.Prev
          disabled={currentPage <= 1}
          onClick={(e) => {
            e.preventDefault();
            paginate(currentPage - 1);
          }}
        />

        {currentPage > 1 && (
          <>
            <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
              {1}
            </Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )}

        {currentPage > 3 && (
          <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
            {currentPage - 2}
          </Pagination.Item>
        )}
        {currentPage > 2 && (
          <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
            {currentPage - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {currentPage <= pages - 1 && (
          <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
            {currentPage + 1}
          </Pagination.Item>
        )}
        {currentPage <= pages - 2 && (
          <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
            {currentPage + 2}
          </Pagination.Item>
        )}
        {currentPage <= pages - 20 && (
          <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={(e) => setPaginateToInnerText(e)}>
              {currentPage === 1 ? 20 : currentPage + 20}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          disabled={currentPage === pages}
          onClick={() => {
            paginate(currentPage + 1);
          }}
        />
        <Pagination.Last
          disabled={currentPage === pages}
          onClick={() => {
            paginate(pages);
          }}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
