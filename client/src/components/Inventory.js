import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryItem from "./InventoryItem";
import Pagination from "./Pagination";

//TODO add pagination
//TODO allow logged in user to check out item
//TODO add loading spinner

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState({
    query: "",
  });

  useEffect(() => {
    getInventory();
    setLoading(false);
  }, []);

  const getInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchInventory = (e) => {
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });
    setLoading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-bar">Search</label>
        <input type="text" value={search.query} onChange={searchInventory} />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InventoryItem inventory={currentItems} query={search.query} />
      <Pagination itemsPerPage={itemsPerPage} totalItems={inventory.length} />
      )}

    </div>
  );
}
