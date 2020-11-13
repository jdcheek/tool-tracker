import React, { useState } from "react";
import axios from "axios";

const InventoryItem = ({ currentItems, checkOutItem }) => {
  const [toggleCheckout, setToggleCheckout] = useState(false);

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
              <button disabled={toggleCheckout} onClick={() => checkOutItem(item._id)}>Check Out</button>
            )}
        </div>
      ))}
    </div>
  );
};

export default InventoryItem;
