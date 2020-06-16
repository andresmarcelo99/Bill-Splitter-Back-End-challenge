import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Test() {
  return (
    <div>
      <Button variant="dark">
        <NavLink style={{ color: "white" }} to="/">
          Home
        </NavLink>
      </Button>
      <h3>Testing seas</h3>
    </div>
  );
}

export default Test;
