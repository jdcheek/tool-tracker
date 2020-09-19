import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

export default function CreateInventory() {
  return (
    <>
      <AddUser></AddUser>
      <EditUser></EditUser>
    </>
  );
}
