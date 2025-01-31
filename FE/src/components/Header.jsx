import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className="h-200">
      <Navbar className="mb-auto" data-bs-theme="dark" expand="md">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="me-auto">
            BDoctors
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/doctor/search" className="nav-link">
                Search
              </Nav.Link>
              <Nav.Link as={NavLink} to="/doctor/register" className="nav-link">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
