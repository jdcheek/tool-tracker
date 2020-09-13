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

  const onSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      username: "",
      password: "",
    };

    // Get username and password
    // Verify password
    // Log user in
  };

  console.log(user);

  return (
    <div>
      <h2>Sign In</h2>
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
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
