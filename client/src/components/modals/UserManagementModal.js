import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  InputGroup,
  Form,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

const AddUserModal = (props) => {
  const { ...rest } = props;
  const mountedRef = useRef(true);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const clearForm = {
    username: "",
    password: "",
    retypedPassword: "",
    isAdmin: false,
  };
  const [user, setUser] = useState(clearForm);
  const [userID, setUserID] = useState("");
  const handleCancel = () => {
    setUser(clearForm);
    setUserID("");
  };

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      res.data.map((user) =>
        list.push({
          username: user.username,
          _id: user._id,
          isAdmin: user.isAdmin,
        })
      );
      if (mountedRef.current) {
        setUserList(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/add", user, {
        withCredentials: true,
      });
      setUser(clearForm);
      getUsers();
      return res;
    } catch (err) {
      if (err.response.data) {
        setError({ message: err.response.data });
        setTimeout(() => setError(""), 3000);
      }
      console.log(err.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/user/delete/${userID}`,
        { withCredentials: true }
      );
      setUserList(() => userList.filter((user) => user._id !== userID));
      setUserID("");
    } catch (err) {
      if (err.response.data) {
        setError({ message: err.response.data });
        setTimeout(() => setError(""), 3000);
      }
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getUsers();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Modal
      {...rest}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header
        closeButton
        onClick={() => {
          handleCancel();
        }}>
        <Modal.Title id='contained-modal-title-vcenter'>
          Manage Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ width: "100%" }}>
            <Form.Label>
              <h5 className='mb-3'>Edit User</h5>
            </Form.Label>
            <Form.Control as='select' htmlSize={3} custom>
              {userList.map((user) => (
                <option
                  onClick={(e) => setUserID(e.target.value)}
                  key={user._id}
                  value={user._id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <OverlayTrigger
          overlay={<Tooltip id='tooltip-disabled'>Select a user</Tooltip>}>
          <Button
            disabled={!userID}
            variant='outline-info'
            onClick={() => {
              // handleGrantAdmin
            }}>
            Admin
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={<Tooltip id='tooltip-disabled'>Select a user</Tooltip>}>
          <Button
            variant='outline-danger'
            disabled={!userID}
            onClick={() => {
              userID && handleDelete();
            }}>
            Delete
          </Button>
        </OverlayTrigger>
      </Modal.Footer>
      <Modal.Body>
        <h5 className='mb-3'>Create User</h5>
        {error.message && (
          <Alert key={error} variant='danger'>
            {error.message}
          </Alert>
        )}
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Username
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            isValid={user.username.length >= 3 || ""}
            isInvalid={user.username.length < 3 && user.username !== ""}
            required
            type='text'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Form.Control.Feedback type='invalid'>
            Username must be greater than 3 characters
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            isValid={user.password.length >= 8}
            isInvalid={user.password.length < 8 && user.password !== ""}
            type='password'
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Form.Control.Feedback type='invalid'>
            Password must be greater than 8 characters
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Retype Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='password'
            required
            isValid={
              user.password === user.retypedPassword &&
              user.retypedPassword !== ""
            }
            isInvalid={user.password !== user.retypedPassword}
            value={user.retypedPassword || ""}
            onChange={(e) =>
              setUser({ ...user, retypedPassword: e.target.value })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Passwords do not match
          </Form.Control.Feedback>
        </InputGroup>

        <Form>
          <Form.Check
            type='switch'
            checked={user.isAdmin}
            onChange={() => setUser({ ...user, isAdmin: !user.isAdmin })}
            id='admin'
            label='Administrative Access'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-primary'
          onClick={() => {
            handleSubmit();
          }}>
          Add User
        </Button>

        <Button
          variant='outline-dark'
          onClick={() => {
            props.onHide();
            handleCancel();
          }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
