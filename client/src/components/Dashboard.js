import React from "react";
import { Link } from "react-router-dom";

export default function Inventory() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/inventory/edit">Manage Inventory</Link>
      <br></br>
      <Link to="/user/add">Add Users</Link>
      <br></br>
      <Link to="/user/edit">Edit Users</Link>
    </div>
  );
}
