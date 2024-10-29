import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => (
  <Navbar className="shadow fs-6" expand="lg" sticky="top" style={{ background: "#eaf2f8" }}>
    <Container>
      <Navbar.Brand href="/" className="fw-bold">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="logo"
          width="70"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "8px" }}
        />
        J99 World Tours
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ fontWeight: 500 }}>
          <Nav.Link as={Link} to="/" className="mx-2">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/services" className="mx-2">
            Services
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="mx-2">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className="mx-2">
            Contact
          </Nav.Link>
          {/* Dropdown Example */}
          <NavDropdown title="More" id="basic-nav-dropdown" className="mx-2">
            <NavDropdown.Item as={Link} to="/action">Action</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/another-action">Another Action</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/something-else">Something Else</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavbarComponent;
