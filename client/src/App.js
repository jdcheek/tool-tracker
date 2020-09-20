import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Inventory from "./components/Inventory";
import EditInventory from "./components/EditInventory";
import CreateInventory from "./components/CreateInventory";
import SignIn from "./components/SignIn";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import bulkPost from "./components/bulkPost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <main>
          <Route exact path="/" component={Inventory} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/inventory/edit" component={EditInventory} />
          <Route exact path="/inventory/add" component={CreateInventory} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/edit" component={EditUser} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/account" component={Account} />
        </main>
      </Router>
    </div>
  );
}

export default App;
