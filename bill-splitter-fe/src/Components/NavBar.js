import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

import { useAuth0 } from "../react-auth0-spa";

function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
          href="/"
        >
          Bill Splitter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/test">
              <Button variant="link" className="splits-link-btn">
                Splits
              </Button>
            </Nav.Link>
            <Nav.Link eventKey={2}>
              <div>
                {!isAuthenticated && (
                  <Button
                    variant="link"
                    className="log-in-btn"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                )}

                {isAuthenticated && (
                  <Button
                    variant="link"
                    className="log-in-btn"
                    onClick={() => logout()}
                  >
                    Log out
                  </Button>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
