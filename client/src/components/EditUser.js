import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [inputIsReset, setInputIsReset] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(true);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    _id: "",
    password: "",
    retypedPassword: "",
    isAdmin: false,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get("http://localhost:5000/user");
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
      let userID = e.target.value;
      let filteredUser = userList.filter((user) => user._id === userID);
      //TODO remove log
      setSelectedUser({
        username: filteredUser[0].username,
        _id: filteredUser[0]._id,
        password: "",
        retypedPassword: "",
        isAdmin: filteredUser[0].isAdmin,
      });
      setInputIsDisabled(false);
    } else {
      setSelectedUser({
        username: "",
        _id: "",
        password: "",
        retypedPassword: "",
        isAdmin: false,
      });
      setInputIsDisabled(true);
    }
  };

  const addEditUser = async (editUser) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/user/update/${editUser._id}`,
        {
          username: editUser.username,
          password: editUser.password,
          isAdmin: editUser.isAdmin,
        }
      );
      console.log("Updated User");
      setInputIsDisabled(true)
      setInputIsReset(true);
    } catch (err) {
      console.log(`Add user error: ${err}`);
    }
  };

  const verifyDeleteUser = () => { };

  const deleteUser = async () => {
    if (selectedUser.username !== "") {
      const conf = window.confirm(
        `Are you sure you want to delete ${selectedUser.username}`
      );
      if (conf) {
        try {
          const res = await axios.delete(
            `http://localhost:5000/user/delete/${selectedUser._id}`
          );

          setSelectedUser({
            username: "",
            _id: "",
            password: "",
            retypedPassword: "",
            isAdmin: false,
          });
          getUsers();
          setInputIsDisabled(true)
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

    addEditUser(selectedUser);
    setTimeout(getUsers, 3000);
    setSelectedUser({
      username: "",
      _id: "",
      password: "",
      retypedPassword: "",
      isAdmin: false,
    });
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
                <select
                  className="form-control"
                  onChange={getSelectedUser}
                  defaultValue="select"
                >
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
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
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
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="retyped-password">Retype Password</label>
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
                  disabled={inputIsDisabled}
                  checked={selectedUser.isAdmin}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isAdmin: !selectedUser.isAdmin,
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
                ) : (<></>
                      )}
                <button disabled={inputIsDisabled} onClick={onEditSubmit}>Submit Changes</button>
              </div>
            </form>
            <Link to="/dashboard">
              <button>Back to Dashboard</button>
            </Link>
            <Link to="/user/add">
              <button>To Add Users</button>
            </Link>
          </div>
        )}
    </>
  );
}
