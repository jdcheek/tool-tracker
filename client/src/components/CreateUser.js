import React, { useState } from "react";

export default function CreateInventory() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newUser;

    if (user.username.length < 3) {
      alert("Username must be greater than 3 characters");
    } else if (user.password.length < 8) {
      alert("Password must be greater than 8 characters");
    } else {
      newUser = user;
      console.log(newUser);
    }

    //TODO uncomment after testing
    //  window.location = "/";
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
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
