import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateInventory() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUserList(res.data);
      console.log("get users");
    } catch (err) {
      console.log(err);
    }
  };

  const addUsers = async (userToAdd) => {
    // userToAdd.username;
    try {
      const res = await axios.post(
        "http://localhost:5000/users/add",
        userToAdd
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleUsernameChange = (e) => {
  //   setNewUser({ ...newUser, username: e.target.value });
  // };

  // const handlePasswordChange = (e) => {
  //   setNewUser({ ...newUser, password: e.target.value });
  // };

  // const handleRetypedPasswordChange = (e) => {
  //   setNewUser({ ...newUser, retypedPassword: e.target.value });
  // };

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

    // console.log({ userToSubmit });
    //TODO catch 400 errors
    //TODO allow non unique passwords, something to do with user.model

    addUsers(userToAdd);
    setNewUser({ username: "", password: "", retypedPassword: "" });
    setTimeout(getUsers, 5000);
  };

  return (
    <div>
      <h2>Add New User</h2>
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
        <button onClick={onSubmit}>Submit</button>
      </form>
      <hr></hr>
      <div className="user-list">
        {userList.map((user) => (
          <section key={user._id}>
            <li>{user.username}</li>
            <button>Edit</button>
          </section>
        ))}
      </div>
    </div>
  );
}
