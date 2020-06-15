import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#2F2FA2" }}
        variant="dark"
      >
        <Navbar.Brand
          className="nav-bar-brand"
          style={{ color: "#F64C72", fontWeight: "500" }}
          href="#home"
        >
          Bill Splitter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets">Splits</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Log
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
