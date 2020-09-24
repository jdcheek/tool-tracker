import React from "react";

const InventoryItem = ({ inventory, query }) => {
  return (
    <div>
      {inventory
        .filter((item) => item.tool_number.includes(query))
        .map((item) => (
          <p key={item._id}>{item.tool_number}</p>
        ))}
    </div>
  );
};

export default InventoryItem;
