import React from "react";
import { Link } from "react-router-dom";

export default function Inventory() {
  return (
    <div>
      <p>Dashboard</p>
      <Link to="/inventory/add">Add Inventory</Link>
    </div>
  );
}
