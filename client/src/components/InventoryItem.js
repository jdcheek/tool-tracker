import React from "react";

const InventoryItem = ({ currentItems, query }) => {
  return (
    <div>
      {currentItems.map((item) => (
        <p key={item._id}>{item.tool_number}</p>
      ))}
    </div>
  );
};

export default InventoryItem;
