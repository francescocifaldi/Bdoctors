import React from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div className=" text-white" style={{ height: "30vh" }}>
      <Navbar data-bs-theme="dark">
        <Container>
          <Nav className="">
            <Link as={NavLink} to="/">
              Servizi
              <Nav className="d-flex flex-column ">
                <Link className="text-white" to="#">
                  Privacy e cockies
                </Link>
                <Link className="text-white" to="#">
                  Condizioni di servizio 
                </Link>
                <Link className="text-white" to="#">
                  Contatti 
                </Link>
              </Nav>
            </Link>
            <Link as={NavLink} to="/doctor/search">
              Per i pazienti
              <Nav className="d-flex flex-column ">
                <Link className="text-white" to="#">
                  Prestazioni
                </Link>
                <Link className="text-white" to="#">
                  Strutture e Ospitality
                </Link>
                <Link className="text-white" to="#">
                  Patologia 
                </Link>
              </Nav>
            </Link>
            <Link as={NavLink} to="/doctor/register">
              Per i professionisti 
              <Nav className="d-flex flex-column ">
                <Link className="text-white" to="#">
                  Area Riservata
                </Link>
                <Link className="text-white" to="#">
                  Risorse Gratuite
                </Link>
                <Link className="text-white" to="#">
                  Centro Assistenza
                </Link>
              </Nav>
            </Link> 
          </Nav>
          <NavLink className={"d-flex flex-column "} to="/">
            <Navbar.Brand>BDoctors</Navbar.Brand>
            <Nav className="d-flex flex-column ">
              <Link className="text-white" to="#">
                © Team 5 srl 
              </Link>
              <Link className="text-white" to="#">
                Via Roma 1 
              </Link>
              <Link className="text-white" to="#">
                00100 Roma, Italia 
              </Link>
            </Nav>
          </NavLink>
        </Container>
      </Navbar>
      
    </div>
  );
}

