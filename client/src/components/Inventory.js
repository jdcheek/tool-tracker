import React, { useState, useEffect } from "react";
import axios from "axios";

//TODO finish edit inventory and send to database

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    query: "",
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

  const searchInventory = async (e) => {
    e.preventDefault();
    setSearch({ ...search, query: e.target.value.toUpperCase() });

    let res = await inventory.filter(
      (item) => item.tool_number.indexOf(search.query) !== -1
    );

    setResults(res);
    setLoading(false);
  };

  console.log(search, results);
  //TODO add search bar to filter results
  //TODO allow logged in user to check out item

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-bar">Search</label>
        <input type="text" value={search.query} onChange={searchInventory} />
      </form>
      <div>
        {search.loading
          ? console.log(search.loading)
          : results.map((item) => <p>{item.tool_number}</p>)}
      </div>
    </div>
  );
}
