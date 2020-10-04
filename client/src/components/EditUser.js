import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputIsDisabled, setInputIsDisabled] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userToEdit, setUsertoEdit] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
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
        list.push({
          username: user.username,
          _id: user._id,
          isAdmin: user.isAdmin,
        })
      );
      setUserList(list);
      setIsLoading(false);
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  const getSelectedUser = async (e) => {
    if (e.target.value !== "select") {
      setIsLoading(true);
      // TODO avoid another server request by filtering userList and matching id
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
        setUsertoEdit({
          ...userToEdit,
          username: res.data.username,
          isAdmin: res.data.isAdmin,
        });
        setIsLoading(false);
        setInputIsDisabled(false);
      } catch (err) {
        console.log(`Get user error: ${err}`);
      }
    } else {
      setUsertoEdit({
        username: "",
        password: "",
        isAdmin: false,
      });
      setSelectedUser({
        username: "",
        _id: "",
        password: "",
        retypedPassword: "",
      });
      setInputIsDisabled(true);
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
          setUsertoEdit({});
          setSelectedUser({
            username: "",
            _id: "",
            password: "",
            retypedPassword: "",
            isAdmin: false,
          });
          getUsers();
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

    //TODO catch 400 errors

    addEditUser(userToEdit);
    setTimeout(getUsers, 3000);
  };
  console.log({ userToEdit, userList });
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
              <button onClick={deleteUser} disabled={inputIsDisabled}>
                Delete User
              </button>
            </form>
          </div>
          <form onSubmit={onEditSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                disabled={inputIsDisabled}
                type="text"
                required
                className="form-control"
                value={selectedUser.username}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    username: e.target.value,
                  });
                  setUsertoEdit({
                    ...userToEdit,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input
                disabled={inputIsDisabled}
                type="text"
                required
                className="form-control"
                value={selectedUser.password}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    password: e.target.value,
                  });
                  setUsertoEdit({
                    ...userToEdit,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Retype Password</label>
              <input
                disabled={inputIsDisabled}
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
            <div>
              <label htmlFor="is-admin">Administrative Rights</label>
              <input
                type="checkbox"
                value={userToEdit.isAdmin}
                onClick={(e) =>
                  setUsertoEdit({
                    ...userToEdit,
                    isAdmin: !userToEdit.isAdmin,
                  })
                }
              ></input>
            </div>
            <div>
              {selectedUser.username.length < 3 ? (
                <p>Username must be at least 3 characters</p>
              ) : selectedUser.password.length < 8 ? (
                <p>Password must be at least 8 characters</p>
              ) : selectedUser.password !== selectedUser.retypedPassword ? (
                <p>Passwords do not match</p>
              ) : (
                <button onClick={onEditSubmit}>Submit Changes</button>
              )}
            </div>
          </form>
          <Link to="/dashboard">
            <button>Back to Dashboard</button>
          </Link>
        </div>
      )}
    </>
  );
}
