import React from "react";

const InventoryItem = ({ currentItems, query }) => {
  return (
    <div>
      {currentItems
        .filter((item) => item.tool_number.includes(query))
        .map((item) => (
          <p key={item._id}>{item.tool_number}</p>
        ))}
    </div>
  );
};

export default InventoryItem;
