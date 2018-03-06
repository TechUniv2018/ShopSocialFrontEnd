import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Menu.css';

class Menu extends React.Component {
  render() {
    if (this.props.isAuthenticated === 'no') {
      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">ShopSocial</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Login
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">ShopSocial</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
                Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Menu.propTypes = {
  isAuthenticated: PropTypes.string.isRequired,
};

export default Menu;
