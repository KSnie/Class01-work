import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavbarComponent = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand className="mx-5" as={Link} to="/">Car Analytics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-2">
          <Nav.Link
            as={Link}
            to="/"
            className={location.pathname === '/' ? 'active-link' : ''}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/highlighted"
            className={location.pathname === '/highlighted' ? 'active-link' : ''}
          >
            Highlighted
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
