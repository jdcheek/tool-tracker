import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = (props) => {
  const mountedRef = useRef(true);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userReset = {
    isLoggedIn: false,
    isAdmin: false,
    username: null,
  };

  useEffect(() => {
    const userAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/status", {
          withCredentials: true,
        });
        if (mountedRef.current) {
          if (res.data) {
            setCurrentUser(res.data);
          } else {
            setCurrentUser(userReset);
            history.push("/login");
          }
        } else {
          return;
        }
      } catch (err) {
        console.log(`Authorization ${err}`);
        history.push("/login");
      }
    };
    userAuth();
    return () => (mountedRef.current = false);
  }, [history, setCurrentUser, userReset]);

  const logOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      setCurrentUser(userReset);
      history.push("/login");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='nav-bar'>
      <Navbar.Brand className='brand' href='/tools'>
        Tool Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {currentUser.isLoggedIn ? (
          <Nav className='ml-auto'>
            <Nav.Link href='/tools'>Search Tools</Nav.Link>
            {/* <Nav.Link href='/account'>My Account</Nav.Link> */}
            {currentUser.isAdmin ? (
              <Nav.Link href='/dashboard'>Admin Dashboard</Nav.Link>
            ) : null}
            <Nav.Link onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link href='/login'>Log In</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

//TODO fix router
