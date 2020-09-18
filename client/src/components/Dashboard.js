import React from "react";
import { Link } from "react-router-dom";

export default function Inventory() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/inventory/add">Inventory</Link>
      <br></br>
      <Link to="/user/">Users</Link>
    </div>
  );
}
