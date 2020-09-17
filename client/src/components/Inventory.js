import React, { useState, useEffect } from "react";
import axios from "axios";

//TODO finish edit inventory and send to database

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

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
  //TODO add search bar to filter results
  //TODO allow logged in user to check out item

  return (
    <div>
      <label htmlFor="search-bar">Search</label>
      <input type="text" />
      <div>{inventory.length}</div>
    </div>
  );
}
