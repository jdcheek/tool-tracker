import React, { useState } from "react";
import axios from "axios";

const InventoryItem = ({ currentItems }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [itemID, setItemId] = useState({ id: "" });
  const [editItem, setEditItem] = useState({
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

  const cancelClickHandler = () => {
    setToggleEdit(!toggleEdit);
  };

  const editClickHandler = (item) => {
    setToggleEdit(!toggleEdit);
    setItemId({ id: item._id });
    setEditItem({
      tool_number: item.tool_number,
      description: item.description || "",
      location: {
        shelf: item.location.shelf,
        bin: item.location.bin,
      },
      status: {
        checked_out: item.status.checked_out,
        username: item.status.username,
        date: item.status.date,
        missing: item.status.missing,
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/inventory/update/${itemID.id}`,
        editItem
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log(editItem, itemID);
  };

  return (
    <div>
      {toggleEdit ? (
        <div className="edit-form">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="form-group">
              <label htmlFor="tool_number">Tool Number</label>
              <input
                type="text"
                required
                className="form-control"
                value={editItem.tool_number}
                onChange={(e) => {
                  setEditItem({ ...editItem, tool_number: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                value={editItem.description}
                onChange={(e) => {
                  setEditItem({ ...editItem, description: e.target.value });
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
                  value={editItem.location.shelf}
                  onChange={(e) => {
                    setEditItem({
                      ...editItem,
                      location: {
                        ...editItem.location,
                        shelf: e.target.value,
                      },
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
                  value={editItem.location.bin}
                  onChange={(e) => {
                    setEditItem({
                      ...editItem,
                      location: { ...editItem.location, bin: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
            <button>Submit Changes</button>
            <button onClick={cancelClickHandler}>Close</button>
          </form>
        </div>
      ) : (
        <></>
      )}
      {currentItems.map((item) => (
        <div key={item._id}>
          <p>Tool Number: {item.tool_number}</p>
          <p>
            Location: {item.location.shelf} - {item.location.bin}
          </p>
          {item.status.checked_out ? (
            <button disabled>Checked Out By {item.status.username}</button>
          ) : (
            <button disabled={toggleEdit}>Check Out</button>
          )}
          {toggleEdit ? (
            <></>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                editClickHandler(item);
              }}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryItem;
