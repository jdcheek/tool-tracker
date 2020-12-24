import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddUser = ({ getUsers, isLoading }) => {
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  const addNewUser = async (userToAdd) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/add",
        userToAdd,
        { withCredentials: true }
      );
      setError("");
      setNewUser({ username: "", password: "", retypedPassword: "" });
      getUsers();
      return res;
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onAddSubmit = (e) => {
    e.preventDefault();
    addNewUser(newUser);
  };

  return (
    <Form onSubmit={onAddSubmit}>
      <Form.Group as={Col} controlId='formGridUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='text'
          placeholder='Enter username'
          name='username'
          value={newUser.username}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='formGridPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='password'
          placeholder='Password'
          name='password'
          value={newUser.password}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='formGridRetypePassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='password'
          placeholder='Retype password'
          name='retypedPassword'
          value={newUser.retypedPassword}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      {error ? <h3>{error}</h3> : null}
    </Form>
    // <div>
    //   <div>
    //     <h2>Create New User</h2>
    //   </div>
    //   <form onSubmit={onAddSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         required
    //         className="form-control"
    //         value={newUser.username}
    //         onChange={(e) => {
    //           setNewUser({ ...newUser, username: e.target.value });
    //         }}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="description">Password</label>
    //       <input
    //         type="text"
    //         required
    //         className="form-control"
    //         value={newUser.password}
    //         onChange={(e) => {
    //           setNewUser({ ...newUser, password: e.target.value });
    //         }}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="description">Retype Password</label>
    //       <input
    //         type="text"
    //         required
    //         className="form-control"
    //         value={newUser.retypedPassword}
    //         onChange={(e) => {
    //           setNewUser({ ...newUser, retypedPassword: e.target.value });
    //         }}
    //       />
    //     </div>
    //     <div>
    //       {newUser.username.length < 3 ? (
    //         <p>Username must be at least 3 characters</p>
    //       ) : newUser.password.length < 8 ? (
    //         <p>Password must be at least 8 characters</p>
    //       ) : newUser.password !== newUser.retypedPassword ? (
    //         <p>Passwords do not match</p>
    //       ) : (
    //               <button onClick={onAddSubmit}>Add New User</button>
    //             )}
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddUser;
