import React, { useState } from "react";
import axios from "axios";

export default function CreateInventory() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  const addUser = async (userToAdd) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/add",
        userToAdd
      );
      console.log(res.data);
    } catch (err) {
      console.log(`Add user error: ${err}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let userToAdd = {
      username: "",
      password: "",
    };

    newUser.username.length < 3
      ? alert("Username must be greater than 3 characters")
      : (userToAdd.username = newUser.username);

    newUser.password.length < 8
      ? alert("Password must be greater than 8 characters")
      : newUser.password !== newUser.retypedPassword
      ? alert("Passwords do not match")
      : (userToAdd.password = newUser.password);

    //TODO catch 400 errors

    addUser(userToAdd);
    alert(`User ${userToAdd.username} Added`);
    setNewUser({ username: "", password: "", retypedPassword: "" });
  };

  return (
    <div>
      <div>
        <h2>Create New User</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            className="form-control"
            value={newUser.username}
            onChange={(e) => {
              setNewUser({ ...newUser, username: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Password</label>
          <input
            type="text"
            required
            className="form-control"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Retype Password</label>
          <input
            type="text"
            required
            className="form-control"
            value={newUser.retypedPassword}
            onChange={(e) => {
              setNewUser({ ...newUser, retypedPassword: e.target.value });
            }}
          />
        </div>
        <button onClick={onSubmit}>Add New User</button>
      </form>
    </div>
  );
}
