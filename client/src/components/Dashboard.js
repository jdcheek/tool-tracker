import React from "react";
import { Link } from "react-router-dom";
import AddUser from './AddUser'
import EditUser from './EditUser'
import EditInventory from './EditInventory'


export default function Inventory() {
  return (
    <div className='dashboard-grid-container'>
      <div className='new-user-grid'><AddUser /></div>
      <div className='edit-user-grid'><EditUser /></div>
      <div className='edit-inventory-grid'><EditInventory /></div>
    </div>
  );
}
