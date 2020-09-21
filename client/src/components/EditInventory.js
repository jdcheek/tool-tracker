import React, { useState, useEffect } from "react";
import axios from "axios";

//TODO finish edit inventory and send to database

export default function AddInventory() {
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState({
    tool_number: "",
    description: "",
    location: {
      shelf: "",
      bin: "",
    },
    status: {
      checked_out: false,
      username: null,
      date: new Date(),
      missing: false,
    },
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

  const enableSubmitButton = () => {
    if (item.tool_number.length < 1) {
      console.log(item.tool_number.length);
      return;
    } else if (item.location.shelf.length < 1) {
      console.log(item.location.shelf.length);
      return;
    } else if (item.location.bin.length < 1) {
      console.log(item.location.bin.length);
      return;
    } else {
      setToggleSubmit(true);
    }
  };

  const handleCheckoutChange = (e) => {
    setItem({ ...item, status: { checked_out: e.target.value } });
  };

  const handleUsernameChange = (e) => {
    setItem({ ...item, status: { username: e.target.value } });
  };

  const handleMissingChange = (e) => {
    setItem({ ...item, status: { missing: e.target.value } });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = item;
    console.log(inventory);
  };

  return (
    <div>
      <h2>Edit Tool</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Enter Tool Number</label>
        <input type="text" />
      </form>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tool_number">Tool Number</label>
          <input
            type="text"
            required
            className="form-control"
            value={item.tool_number}
            onChange={(e) => {
              setItem({ ...item, tool_number: e.target.value });
              enableSubmitButton();
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            required
            className="form-control"
            value={item.description}
            onChange={(e) => {
              setItem({ ...item, description: e.target.value });
              enableSubmitButton();
            }}
          />
          <div className="form-group">
            <label htmlFor="location">Shelf Number</label>
            <input
              type="number"
              min="1"
              max="30"
              required
              className="form-control"
              value={item.location.shelf}
              onChange={(e) => {
                setItem({
                  ...item,
                  location: { ...item.location, shelf: e.target.value },
                });
                enableSubmitButton();
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Bin Letter</label>
            <input
              type="text"
              required
              className="form-control"
              value={item.location.bin}
              onChange={(e) => {
                setItem({
                  ...item,
                  location: { ...item.location, bin: e.target.value },
                });
                enableSubmitButton();
              }}
            />
          </div>
        </div>
        <button disabled={toggleSubmit}>Submit Changes</button>
      </form>
    </div>
  );
}
