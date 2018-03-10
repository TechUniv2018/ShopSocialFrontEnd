import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
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
    togetherMenuText: 'Together',
    togetherStatus: 0,
    showTogetherModal: false,
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
  toggleTogether = () => {
    // window.TogetherJSConfig_getUserName = function () {
    //   // alert(this.state.userName);
    //   return this.state.userName;
    // };
    const uName = this.state.userName;
    // alert(uName);
    window.TogetherJS();
    if (this.state.togetherStatus === 0) {
      const getturl = setInterval(() => {
        const turl = window.TogetherJS.shareUrl();
        if (turl !== null) {
          this.setState({
            togetherStatus: 1,
            togetherMenuText: 'End Together',
            showTogetherModal: true,
          });
          window.TogetherJSConfig_getUserName = function () {
            // alert(this.state.userName);
            return uName;
          };
          window.TogetherJS.refreshUserData();
          alert(window.TogetherJS.shareUrl());
          clearInterval(getturl);
        }
      }, 1000);
      // window.TogetherJSConfig_getUserName = function () {
      //   alert(this.state.userName);
      //   return this.state.userName;
      // };
      window.TogetherJS.refreshUserData();
    } else {
      this.setState({
        togetherStatus: 0,
        togetherMenuText: 'Together',
      });
    }
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


  handleTogetherModalClose = () => {
    this.setState({ showTogetherModal: false });
  }

  handlTogetherModaleShow = () => {
    this.setState({ showTogetherModal: true });
  }
  render() {
    // if (this.state.togetherStatus === 1) {
    //   window.TogetherJSConfig_getUserName = function () {
    //     return this.state.userName;
    //   };
    //   window.TogetherJS.refreshUserData();
    //   alert(window.TogetherJS.shareUrl());
    // }


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
              <div className="NavbarText" onClick={() => { this.toggleTogether(); }}>{this.state.togetherMenuText}</div>
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
        <Modal show={this.state.showTogetherModal} onHide={this.handleTogetherModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lets Shop Together</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <input type ="text" placeholder="Enter email of friend to shop with" />
            <button onClick={this.handleForwardTogetherRequest}>Send request </button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleTogetherModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    );
  }
}

export default MenuMain;
