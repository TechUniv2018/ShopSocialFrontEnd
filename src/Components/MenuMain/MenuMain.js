import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import RegisterLoginModal from '../RegisterLoginModal/RegisterLoginModal';
import './MenuMain.css';

class MenuMain extends React.Component {
  state={
    isAuthenticated: false,
    userId: '',
    cartId: '',
    userName: '',
    userEmail: '',
    showLogin: false,
  }
  componentDidMount() {
    if (window.localStorage.getItem('email') !== null) {
      this.setState({
        userEmail: window.localStorage.getItem('email'),
        cartId: window.localStorage.getItem('cartID'),
        userName: window.localStorage.getItem('name'),
        userId: window.localStorage.getItem('userID'),
        isAuthenticated: true,
      });
    }
  }
  onLogin = (userObject) => {
    this.setState({
      userId: userObject.userID,
      cartId: userObject.cartID,
      userEmail: userObject.email,
      userName: userObject.name,
      isAuthenticated: true,
      showLogin: false,
    });
  }
  onLogout = () => {
    axios.get('/user/logout').then((logoutResponse) => {
      if (logoutResponse.data.statusCode === 200) {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('cartID');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('userID');
        this.setState({
          isAuthenticated: false,
          userId: '',
          cartId: '',
          userName: '',
          userEmail: '',
          showLogin: false,
        });
      }
    });
  }
  handleLoginModalClose = () => {
    this.setState({
      showLogin: false,
    });
  }
  handleLoginModalOpen = () => {
    this.setState({
      showLogin: true,
    });
  }
  render() {
    if (!this.state.isAuthenticated) {
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
                <div className="NavbarText" onClick={() => { this.handleLoginModalOpen(); }}>Login / Register</div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
          <RegisterLoginModal
            onLogin={this.onLogin}
            showLogin={this.state.showLogin}
            handleClose={this.handleLoginModalClose}
          />
        </Navbar>
      );
    }
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
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Together</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Cart</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Hi {this.state.userName}</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.onLogout(); }}>Logout</div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MenuMain;
