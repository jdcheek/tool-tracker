import React, { useState, useEffect } from "react";
import axios from "axios";
import EditInventoryCard from "./EditInventoryCard";
import AddInventory from "./AddInventory";
import Pagination from "./Pagination";

//TODO allow logged in user to check out item
//TODO add loading spinner

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [currentQuery, setCurrentQuery] = useState([]);
  const [loading, setLoading] = useState(true);
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
    getInventory();
    setLoading(false);
  }, []);

  useEffect(() => {
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
  }, [search]);

  const getInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventory(res.data);
      setCurrentQuery(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchInventory = (e) => {
    setLoading(true);
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setCurrentPage(1);
    setLoading(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
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
