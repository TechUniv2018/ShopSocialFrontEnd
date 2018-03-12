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
      togetherReqfromEmail: '',
      togethersessionid: '',
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
    if (window.localStorage.getItem('togetherMenuText') !== null) {
      this.setState({
        togetherMenuText: window.localStorage.getItem('togetherMenuText'),
        togetherStatus: window.localStorage.getItem('togetherStatus'),
      });
    }
    socket.on('relayConnectTogether', (connectReq) => {
      // if (this.state.userEmail === 'ananddeb232@gmail.com') {
      //   const value = `email:${this.state.userEmail}togstatus${this.state.togetherStatus}requestEmail:${connectReq.requestEmail}`;
      //   alert(value);
      // }
      const gettstatus = window.localStorage.getItem('togetherStatus');
      // alert('heuuuu');
      if (connectReq.requestEmail === this.state.userEmail && this.state.togetherStatus == 0) {
        this.setState({
          showTogetherReqModal: true,
          togetherReqfrom: connectReq.senderName,
          togetherReqfromEmail: connectReq.senderEmail,
          togetherlink: connectReq.togetherlink,
        });
      } else if (connectReq.requestEmail === this.state.userEmail && this.state.togetherStatus == 1) {
        setTimeout(() => {
          // /
        }, 1000);
        const obj = {
          togetherresponse: 'rejected',
          rejectmessage: 'User is busy in another session',
          respondto: connectReq.senderEmail,
        };
        socket.emit('connectTogetherResponse', obj);
      }
    });
    socket.on('relayConnectTogetherResponse', (connectRes) => {
      // alert('heuuuu');
      if (connectRes.respondto === this.state.userEmail && connectRes.togetherresponse === 'rejected') {
        alert(connectRes.rejectmessage);
        window.localStorage.removeItem('togetherMenuText');
        window.localStorage.setItem('togetherMenuText', 'Together');
        window.localStorage.removeItem('togetherStatus');
        window.localStorage.setItem('togetherStatus', 0);
        setTimeout(() => {
          window.TogetherJS();
        }, 1000);
        this.setState({

          togetherReqfrom: '',
          togetherReqfromEmail: '',
          togetherMenuText: 'Together',
          togetherStatus: 0,
          togetherlink: '',
        });
      } else if (connectRes.respondto === this.state.userEmail && connectRes.togetherresponse === 'accepted') {
        window.localStorage.removeItem('cartID');
        window.localStorage.setItem('cartID', connectRes.togethercartid);
        window.localStorage.removeItem('togethersessionid');
        window.localStorage.setItem('togethersessionid', connectRes.togethersessionid);

        this.setState({
          cartId: connectRes.togethercartid,
          togethersessionid: connectRes.togethersessionid,


        });
      }
    });
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
  handleTogetherModalClose = () => {
    this.setState({ showTogetherModal: false });
  }
  handleTogetherReqModalClose = () => {
    this.setState({ showTogetherReqModal: false });
  }
  handlTogetherReqModaleShow = () => {
    this.setState({ showTogetherReqModal: true });
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
    // alert(this.state.requestemail);
    // const socket = socketIOClient('http://127.0.0.1:8080');
    // const socket = socketIOClient('http://127.0.0.1:8080');
    const obj = {
      senderEmail: this.state.userEmail,
      senderName: this.state.userName,
      requestEmail: this.state.requestemail,
      togetherlink: this.state.togetherlink,
    };

    socket.emit('connectTogether', obj);
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments


    alert('Request sent');

    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }
  handleAcceptTogetherRequest = () => {
    const uName = this.state.userName;
    const sessionstr = this.state.togetherReqfromEmail + this.state.userEmail;
    window.TogetherJSConfig_getUserName = function () {
      // alert(this.state.userName);
      return uName;
    };
    window.TogetherJS.refreshUserData();
    const url = `/api/v1/cart/initTogetherCart/${sessionstr}`;
    axios.get(url).then((togetherCart) => {
      // console.log(togetherCart.data);
      const newcartid = togetherCart.data.message;
      if (togetherCart.data.statusCode === 201) {
        const obj = {
          togetherresponse: 'accepted',
          togethercartid: newcartid,
          togethersessionid: sessionstr,

          respondto: this.state.togetherReqfromEmail,
        };
        window.TogetherJSConfig_getUserName = function () {
          // alert(this.state.userName);
          return uName;
        };
        window.TogetherJS.refreshUserData();
        setTimeout(() => {
          window.TogetherJSConfig_getUserName = function () {
            // alert(this.state.userName);
            return uName;
          };
          window.TogetherJS.refreshUserData();
        }, 1000);

        socket.emit('connectTogetherResponse', obj);
        window.localStorage.removeItem('cartID');
        window.localStorage.setItem('cartID', newcartid);
        window.localStorage.removeItem('togetherMenuText');
        window.localStorage.setItem('togetherMenuText', 'End Together');
        window.localStorage.removeItem('togetherStatus');
        window.localStorage.setItem('togetherStatus', 1);
        window.localStorage.removeItem(' togethersessionid');
        window.localStorage.setItem(' togethersessionid', sessionstr);
        this.setState({
          cartId: newcartid,
          togetherMenuText: 'End Together',
          togetherStatus: 1,
          togethersessionid: sessionstr,


        });

        window.location.href = this.state.togetherlink;
        window.location.reload();
      }
    });
  }
  handleRejectTogetherRequest = () => {
    const obj = {
      togetherresponse: 'rejected',
      rejectmessage: 'User did not approve request',
      respondto: this.state.togetherReqfromEmail,
    };
    socket.emit('connectTogetherResponse', obj);
    this.setState({
      showTogetherReqModal: false,

    });
  }
  onMessage = (message) => {
    console.log(message);
  }
  toggleTogether = () => {
    const uName = this.state.userName;
    // alert(uName);
    window.TogetherJSConfig_getUserName = function () {
      // alert(this.state.userName);
      return uName;
    };
    window.TogetherJS.refreshUserData();
    window.TogetherJS();

    // alert(this.state.togetherStatus);
    if (this.state.togetherStatus != 1) {
      // alert('fgfg');

      const getturl = setInterval(() => {
        const turl = window.TogetherJS.shareUrl();
        if (turl !== null) {
          window.localStorage.setItem('togetherStatus', 1);
          window.localStorage.setItem('togetherMenuText', 'End Together');

          this.setState({
            togetherStatus: 1,
            togetherMenuText: 'End Together',
            showTogetherModal: true,
            togetherlink: window.TogetherJS.shareUrl(),
          });

          // alert(window.TogetherJS.shareUrl());
          // window.TogetherJS.refreshUserData();
          clearInterval(getturl);
        }
      }, 1000);
    } else {
      const url = `/api/v1/cart/initCart/${this.state.userId}`;
      axios.get(url).then((origCart) => {
        if (origCart.data.statusCode === 200) {
          // alert(origCart.data.message);
          console.log(origCart.data.message);
          window.localStorage.removeItem(' cartID');
          window.localStorage.removeItem(' togetherMenuText');
          window.localStorage.removeItem(' togetherStatus');
          window.localStorage.removeItem(' togethersessionid');
          window.localStorage.setItem('cartID', origCart.data.message.cartID);

          window.localStorage.setItem(' togethersessionid', '');
          window.localStorage.setItem('togetherStatus', 0);
          window.localStorage.setItem('togetherMenuText', 'Together');

          this.setState({
            togetherStatus: 0,
            togetherMenuText: 'Together',
            togetherlink: '',
            togetherReqfrom: '',
            togetherReqfromEmail: '',
            togethersessionid: '',
          });
        }
      });
    }
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
        <Modal show={this.state.showTogetherReqModal} onHide={this.handleTogetherReqModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Friend {this.state.togetherReqfrom}  Sent a Request to Shop Together</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <button onClick={this.handleAcceptTogetherRequest}>Accept Request </button>
            <button onClick={this.handleRejectTogetherRequest}>Reject Request </button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleTogetherReqModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    );
  }
}
export default socketConnect(MenuMain);

