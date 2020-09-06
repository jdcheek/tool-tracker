import React from "react";
import "./App.css";

import { HashRouter as Router, Route } from "react-router-dom";

import Account from "./pages/account";
import Dashboard from "./pages/dashboard";
import Navigation from "./components/Navigation";
import Inventory from "./pages/inventory";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <main>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={Account} />
          <Route path="/inventory" component={Inventory} />
        </main>
      </Router>
    </div>
  );
}

export default App;
