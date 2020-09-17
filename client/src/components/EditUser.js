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
      <h1>Edit Users</h1>
      <label>Username: </label>
      <select className="form-control" value="test">
        {userList.map((user) => (
          <option key={user._id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button>Edit</button>
    </div>
  );
}
