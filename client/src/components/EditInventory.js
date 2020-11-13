import React, { useState, useEffect, useRef } from "react";
import EditInventoryCard from "./EditInventoryCard";
import AddInventory from "./AddInventory";
import Pagination from "./Pagination";

//TODO allow logged in user to check out item
//TODO add loading spinner

const EditInventory = ({ inventory, isLoading }) => {
  // TODO possibly use useReducer
  const [currentQuery, setCurrentQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState({
    query: "",
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentQuery.slice(indexOfFirstItem, indexOfLastItem);
  const pages = Math.ceil(currentQuery.length / itemsPerPage);

  useEffect(() => {
    setCurrentQuery(inventory)
  }, [])

  useEffect(() => {
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
  }, [search]);

  const searchInventory = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Manage Inventory</h2>
      <h4>Add New Item</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <>
            <AddInventory />
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search-bar">Search</label>
              <input
                type="text"
                value={search.query}
                onChange={searchInventory}
              />
            </form>
            <EditInventoryCard
              currentItems={currentItems}
              currentQuery={currentQuery}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={currentQuery.length}
              pages={pages}
              setItemsPerPage={setItemsPerPage}
              paginate={paginate}
            />
          </>
        )}
    </div>
  );
}

export default EditInventory;