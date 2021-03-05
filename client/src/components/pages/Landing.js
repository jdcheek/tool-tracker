import React from "react";
import { useHistory } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";

export default function Landing() {
  const history = useHistory();
  return (
    <Jumbotron style={{ margin: "10vh auto" }}>
      <h1 style={{ textAlign: "center" }}>Welcome to Tool Tracker</h1>
      <p style={{ maxWidth: "600px" }}>
        An easy to use tool management app with built in user control and report
        system. If you would like to implement this software into your business,
        please use the contact form {<a>here</a>}.
      </p>
      <p style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='outline-primary'
          onClick={() => history.push("/login")}>
          Sign in
        </Button>
      </p>
    </Jumbotron>
  );
}
