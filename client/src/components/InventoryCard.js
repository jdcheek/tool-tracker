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

  return (
    <div>
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
        </div>
      ))}
    </div>
  );
};

export default InventoryItem;
