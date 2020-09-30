import React from "react";

const InventoryItem = ({ currentItems }) => {
  return (
    <div>
      {currentItems.map((item) => (
        <div key={item._id}>
          <p>Tool Number: {item.tool_number}</p>
          <p>
            Location: {item.location.shelf} - {item.location.bin}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default InventoryItem;
