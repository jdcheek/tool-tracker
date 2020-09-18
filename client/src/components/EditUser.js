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

  return (
    <div>
      <h2>Edit Users</h2>
      <label>Username: </label>
      <select className="form-control">
        {userList.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button>Edit</button>
    </div>
  );
}
