import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateInventory() {
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

  const addNewItem = async () => {
    try {
      const res = axios.post("http://localhost:5000/inventory/add", item);
      console.log(res);
    } catch (err) {
      console.log(`Add new item error: ${err}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNewItem();
    alert(`Item ${item.tool_number} created`);
    setItem({
      tool_number: "",
      description: "",
      location: {
        shelf: "",
        bin: "",
      },
      status: {
        checked_out: false,
        username: "",
        date: new Date(),
        missing: false,
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tool_number">Tool Number</label>
          <input
            type="text"
            required
            className="form-control"
            value={item.tool_number}
            onChange={(e) => {
              setItem({ ...item, tool_number: e.target.value.toUpperCase() });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            value={item.description}
            onChange={(e) => {
              setItem({ ...item, description: e.target.value });
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
                  location: {
                    ...item.location,
                    bin: e.target.value.toUpperCase(),
                  },
                });
              }}
            />
          </div>
        </div>
        <button onClick={onSubmit}>Add New Tool</button>
      </form>
      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
}
