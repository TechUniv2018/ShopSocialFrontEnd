import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { socketConnect } from 'socket.io-react';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import RegisterLoginModal from '../RegisterLoginModal/RegisterLoginModal';
import './MenuMain.css';

const socket = socketIOClient('http://localhost:8080');
// const socket = window.socket();

class MenuMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userId: '',
      cartId: '',
      userName: '',
      userEmail: '',
      showLogin: false,
      togetherMenuText: 'Together',
      togetherStatus: 0,
      showTogetherModal: false,
      togetherlink: '',
      showTogetherReqModal: false,
      togetherReqfrom: '',
    };
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
            togetherlink: window.TogetherJS.shareUrl(),
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
  handleTogetherInputEmail = (evt) => {
    this.setState({ requestemail: evt.target.value });
  }
  handleForwardTogetherRequest= () => {
    // const socket = socketIOClient(this.state.endpoint)

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    alert(this.state.requestemail);
    // const socket = socketIOClient('http://127.0.0.1:8080');
    // const socket = socketIOClient('http://127.0.0.1:8080');
    const obj = {
      senderName: this.state.userName,
      requestEmail: this.state.requestemail,
      togetherlink: this.state.togetherlink,
    };

    socket.emit('connectTogether', obj);
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments


    alert('Request sent');

    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }
  onMessage = (message) => {
    console.log(message);
  }

  render() {
    // if (this.state.togetherStatus === 1) {
    //   window.TogetherJSConfig_getUserName = function () {
    //     return this.state.userName;
    //   };
    //   window.TogetherJS.refreshUserData();
    //   alert(window.TogetherJS.shareUrl());
    // }const socket = socketIOClient(this.state.endpoint);
    socket.on('relayConnectTogether', (connectReq) => {
      if (connectReq.requestEmail === this.state.userEmail) {
        this.setState({
          showTogetherReqModal: true,
          togetherReqfrom: connectReq.senderName,
          togetherlink: connectReq.togetherlink,
        });
      }
    });


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
            <input type="text" placeholder="Enter email of friend to shop with" onChange={this.handleTogetherInputEmail} />
            <button onClick={this.handleForwardTogetherRequest}>Send request </button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleTogetherModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showTogetherReqModal} onHide={this.handleTogetherModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lets Shop Together</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <input type="text" placeholder="Enter email of friend to shop with" onChange={this.handleTogetherInputEmail} />
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
export default socketConnect(MenuMain);

