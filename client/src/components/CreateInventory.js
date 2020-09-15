import React, { useState } from "react";
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

  const handleToolChange = (e) => {
    setItem({ ...item, tool_number: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setItem({ ...item, description: e.target.value });
  };

  const handleShelfChange = (e) => {
    setItem({
      ...item,
      location: { ...item.location, shelf: e.target.value },
    });
  };

  const handleBinChange = (e) => {
    setItem({
      ...item,
      location: { ...item.location, bin: e.target.value },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/inventory/add", item)
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));

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
      <h2>Add New Tool</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tool_number">Tool Number</label>
          <input
            type="text"
            required
            className="form-control"
            value={item.tool_number}
            onChange={handleToolChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            value={item.description}
            onChange={handleDescriptionChange}
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
              onChange={handleShelfChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Bin Letter</label>
            <input
              type="text"
              required
              className="form-control"
              value={item.location.bin}
              onChange={handleBinChange}
            />
          </div>
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
