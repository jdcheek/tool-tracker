import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InventoryCard from "./InventoryCard";
import Pagination from "./Pagination";

//TODO allow logged in user to check out item
//TODO add loading spinner

export default function Inventory() {
  const mountedRef = useRef(true)
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
    if (!mountedRef.current) {
      return
    }
    getInventory();
    return () => (mountedRef.current = false)
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      return
    }
    setCurrentQuery(
      inventory.filter((item) => item.tool_number.includes(search.query))
    );
  }, [search]);

  const getInventory = async () => {
    if (!mountedRef.current) {
      return
    }
    try {
      const res = await axios.get("http://localhost:5000/inventory", { withCredentials: true });
      setInventory(res.data);
      setCurrentQuery(res.data);
      setLoading(false);
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
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-bar">Search</label>
        <input type="text" value={search.query} onChange={searchInventory} />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
          <>
            <InventoryCard
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
