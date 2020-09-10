import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Inventory from "./components/Inventory";
import EditInventory from "./components/EditInventory";
import CreateInventory from "./components/CreateInventory";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <main>
          <Route exact path="/" component={Inventory} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/edit/:id" component={EditInventory} />
          <Route exact path="/inventory/add" component={CreateInventory} />
          <Route exact path="/user" component={CreateUser} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/account" component={Account} />

          {/* <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={Account} />
          <Route path="/inventory" component={Inventory} /> */}
        </main>
      </Router>
    </div>
  );
}

export default App;
