import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToEdit, setUsertoEdit] = useState({});
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    _id: "",
    password: "",
    retypedPassword: "",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get("http://localhost:5000/users");
      res.data.map((user) =>
        list.push({ username: user.username, _id: user._id })
      );
      setUserList(list);
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
    setIsLoading(false);
  };

  const getSelectedUser = async (e) => {
    if (e.target.value !== "select") {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${e.target.value}`
        );
        setSelectedUser({
          username: res.data.username,
          _id: res.data._id,
          password: "",
          retypedPassword: "",
        });
      } catch (err) {
        console.log(`Get user error: ${err}`);
      }
    } else {
      setUsertoEdit("");
    }
  };

  const addEditUser = async (editUser) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/users/update/${selectedUser._id}`,
        editUser
      );
      console.log("Updated User");
    } catch (err) {
      console.log(`Add user error: ${err}`);
    }
  };

  const deleteUser = async () => {
    if (selectedUser.username !== "") {
      const conf = window.confirm(
        `Are you sure you want to delete ${selectedUser.username}`
      );
      if (conf) {
        try {
          const res = await axios.delete(
            `http://localhost:5000/users/delete/${selectedUser._id}`,
            userToEdit
          );
          alert(`User ${selectedUser.username} Deleted`);
          setUsertoEdit({});
          setSelectedUser({
            username: "",
            _id: "",
            password: "",
            retypedPassword: "",
          });
          getUsers();
          //TODO render user deleted message for 3 seconds
        } catch (err) {
          console.log(`Edit user error: ${err}`);
        }
      } else {
        return;
      }
    }
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    const editUser = {
      username: "",
      password: "",
    };

    selectedUser.username.length < 3
      ? alert("Username must be greater than 3 characters")
      : (editUser.username = selectedUser.username);

    selectedUser.password.length < 8
      ? alert("Password must be greater than 8 characters")
      : selectedUser.password !== selectedUser.retypedPassword
      ? alert("Passwords do not match")
      : (editUser.password = selectedUser.password);

    //TODO catch 400 errors

    addEditUser(editUser);
    setTimeout(getUsers, 3000);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <h2>Edit User</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>User List: </label>
              <select className="form-control" onChange={getSelectedUser}>
                <option value="select">Select User</option>
                {userList.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
              <button onClick={deleteUser}>Delete User</button>
            </form>
          </div>
          <form onSubmit={onEditSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                className="form-control"
                value={selectedUser.username}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input
                type="text"
                required
                className="form-control"
                value={selectedUser.password}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Retype Password</label>
              <input
                type="text"
                required
                className="form-control"
                value={selectedUser.retypedPassword}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    retypedPassword: e.target.value,
                  });
                }}
              />
            </div>
            <button onClick={onEditSubmit}>Submit Changes</button>
          </form>
          <Link to="/dashboard">
            <button>Back to Dashboard</button>
          </Link>
        </div>
      )}
    </>
  );
}
