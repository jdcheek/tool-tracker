import React, { useState, useEffect } from "react";
import axios from "axios";

//TODO finish edit inventory and send to database

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState({
    query: "",
    loading: true,
    message: "",
  });

  useEffect(() => {
    getInventory();
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
    setSearch({ ...search, query: e.target.value });

    const res = inventory.filter((item) =>
      item.tool_number.includes(search.query)
    );
    console.log(res);
    console.log(search.query);
  };

  //TODO add search bar to filter results
  //TODO allow logged in user to check out item

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-bar">Search</label>
        <input type="text" value={search.query} onChange={searchInventory} />
      </form>
      <div>{inventory.length}</div>
    </div>
  );
}
