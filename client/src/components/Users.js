import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateInventory() {
  const [userToEdit, setUserToEdit] = useState({});
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUserList(res.data);
      console.log("get users");
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  const editUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userToEdit}`);
      console.log(res.data);
    } catch (err) {
      console.log(`Get user error: ${err}`);
    }
  };
  const addUsers = async (userToAdd) => {
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

  //const deleteUser = () => {};

  const submitEditUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/update/id",
        userToEdit
      );
      console.log(res.data);
    } catch (err) {
      console.log(`Edit user error: ${err}`);
    }
  };

  const newUserToSubmit = (e) => {
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

    addUsers(userToAdd);
    setNewUser({ username: "", password: "", retypedPassword: "" });
    setTimeout(getUsers, 5000);
  };

  console.log(userToEdit);
  return (
    <div>
      <div>
        <h2>Edit Users</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Username: </label>
          <select
            className="form-control"
            onChange={(e) => setUserToEdit(e.target.value)}
          >
            <option></option>
            {userList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <button onClick={editUser}>Edit</button>
        </form>
      </div>
      <h2>Add New User</h2>
      <form onSubmit={newUserToSubmit}>
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
        <button onClick={newUserToSubmit}>Submit</button>
      </form>
    </div>
  );
}
