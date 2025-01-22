import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router';

export default function Header() {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>BDoctors</Navbar.Brand>
                </NavLink>

                <Nav>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/doctor/search">
                        Search
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/doctor/register">
                        Register
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
