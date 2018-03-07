import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './MenuMain.css';

class MenuMain extends React.Component {
  render() {
    if (this.props.isAuthenticated === 'no') {
      return (
        <Navbar className="NavbarMain">
          <Navbar.Header>
            <Navbar.Brand>
              <div className="NavbarIcon" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight classname="NavbarMain">
              <NavItem eventKey={1} >
                <div className="NavbarText">Login / Register</div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return (
      <Navbar classname="NavbarMain">
        <Navbar.Header>
          <Navbar.Brand>
            <div className="NavbarIcon" />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight classname="NavbarMain">
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Logout</div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

MenuMain.propTypes = {
  isAuthenticated: PropTypes.string.isRequired,
};

export default MenuMain;
