import React from 'react';
import './Menu.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Menu extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

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

export default Menu;
