import React, { useState } from "react";

//TODO finish edit inventory and send to database

export default function EditInventory() {
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

    console.log(item);

    //TODO uncomment after testing
    //  window.location = "/";
  };

  console.log(item);

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
            required
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
      </form>
    </div>
  );
}
