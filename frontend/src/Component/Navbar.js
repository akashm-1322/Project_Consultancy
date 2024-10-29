import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarComponent = () => (
  <Navbar className="shadow" bg="light" expand="lg" sticky="top" style={{background: "#eaf2f8"}}>
    <Container>
      <Navbar.Brand href="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="logo"
          width="70"       // Set the desired width
          height="30"      // Set the desired height
          className="d-inline-block align-top"
        /></Navbar.Brand>
      <Navbar.Brand as={Link} to="/">J99 World Tours</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavbarComponent;
