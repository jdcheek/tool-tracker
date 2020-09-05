import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Navigation = () => {
  return (
    <div className="Nav-bar">
      <FontAwesomeIcon
        className="crosshair-icon"
        icon={faCrosshairs}
        size="2x"
      />
      <h1>Tool Tracker</h1>
      <Link className="Nav-link Dash-link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="Nav-link" to="/inventory">
        Inventory
      </Link>
      <Link className="Nav-link" to="/account">
        Account
      </Link>
      <FontAwesomeIcon className="cog-icon" icon={faCog} size="2x" />
    </div>
  );
};

export default Navigation;
