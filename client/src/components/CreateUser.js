import React, { useState } from "react";

export default function CreateInventory() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleRetypedPasswordChange = (e) => {
    setUser({ ...user, retypedPassword: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      username: "",
      password: "",
    };

    user.username.length < 3
      ? alert("Username must be greater than 3 characters")
      : (newUser.username = user.username);

    user.password.length < 8
      ? alert("Password must be greater than 8 characters")
      : user.password !== user.retypedPassword
      ? alert("Passwords do not match")
      : (newUser.password = user.password);

    // console.log({ newUser  });
    //TODO send user to database;
  };

  console.log(user);

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
            value={user.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Password</label>
          <input
            type="text"
            required
            className="form-control"
            value={user.password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Retype Password</label>
          <input
            type="text"
            required
            className="form-control"
            value={user.retypedPassword}
            onChange={handleRetypedPasswordChange}
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
