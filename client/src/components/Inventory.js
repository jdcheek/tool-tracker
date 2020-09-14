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

  return (
    <div>
      <div>
        {inventory.map((item) => (
          <ul key={item._id}>
            <li>Tool Number: {item.tool_number}</li>
            <li>Description: {item.description}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
