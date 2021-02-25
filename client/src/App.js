import React, { useState, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Account from "./components/Account";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";
import EditInventory from "./components/EditInventory";
import EditUser from "./components/EditUser";
import Inventory from "./components/Inventory";
import { UserContext } from "./components/UserContext";
import Navigation from "./components/Navigation";
import LogIn from "./components/LogIn";

function App() {
  const mountedRef = useRef(true);

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    isAdmin: false,
    username: null,
    toolsCheckedOut: [],
  });

  const getAccountInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/auth/status/`, {
        withCredentials: true,
      });

      if (mountedRef.current) {
        setCurrentUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <div className='wrapper'>
        <Router>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Navigation />
            <div className='app-container'>
              {currentUser.isLoggedIn && (
                <section className='side-bar'>
                  <Account getAccountInfo={getAccountInfo} />
                </section>
              )}
              <main className='page-container'>
                <Route
                  exact
                  path='/tools'
                  component={() => (
                    <Inventory getAccountInfo={getAccountInfo} />
                  )}
                />
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/tools/edit' component={EditInventory} />
                <Route exact path='/user/add' component={AddUser} />
                <Route exact path='/user/edit' component={EditUser} />
                <Route exact path='/dashboard' component={Dashboard} />
              </main>
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
