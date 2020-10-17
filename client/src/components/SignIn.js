import React, { useState } from "react";

export default function CreateInventory() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
       setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault()
   console.log(user);
    // Get username and password
    // Verify password
    // Log user in
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            className="form-control"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Password</label>
          <input
            type="text"
            name="password"
            required
            className="form-control"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
