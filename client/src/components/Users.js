import React from "react";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

export default function Users() {
  return (
    <div>
      <EditUser></EditUser>
      <CreateUser></CreateUser>
    </div>
  );
}
