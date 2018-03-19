import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SnackBar from 'react-material-snackbar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import RegisterLoginModal from '../RegisterLoginModal/RegisterLoginModal';
import CartModal from '../CartModal/CartModal';
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
      cartContents: [],
      userName: '',
      userEmail: '',
      showLogin: false,
      showCart: false,
      togetherMenuText: 'Together',
      togetherStatus: 0,
      showTogetherModal: false,
      togetherlink: '',
      showTogetherReqModal: false,
      togetherReqfrom: '',
      togetherReqfromEmail: '',
      togethersessionid: null,
      alertText: '',
      alertState: false,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem('email') !== null) {
      this.setState({
        cartContents: JSON.parse(window.localStorage.getItem('cartContents')),
        isAuthenticated: true,
        showLogin: false,

      });
    }
    if (window.localStorage.getItem('togetherMenuText') !== null) {
      this.setState({
        togetherMenuText: window.localStorage.getItem('togetherMenuText'),
        togetherStatus: window.localStorage.getItem('togetherStatus'),
        togethersessionid: window.localStorage.getItem('togethersessionid'),
      });
    }

    socket.on('relayConnectTogether', (connectReq) => {
      const gettstatus = window.localStorage.getItem('togetherStatus');

      const userEmail = window.localStorage.getItem('email');


      if (connectReq.requestEmail === userEmail && this.state.togetherStatus == 0) {
        // this.addStyleString2('#togetherjs-container.togetherjs { display: block !important; }');

        window.localStorage.setItem('togetherlink', connectReq.togetherlink);
        this.setState({
          showTogetherReqModal: true,
          togetherReqfrom: connectReq.senderName,
          togetherReqfromEmail: connectReq.senderEmail,
          togetherlink: connectReq.togetherlink,
        });
      } else if (connectReq.requestEmail === userEmail && this.state.togetherStatus == 1) {
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
      const userEmail = window.localStorage.getItem('email');
      const togetherStatus = window.localStorage.getItem('togetherStatus');
      window.localStorage.setItem('pingStatus', 0);
      if (connectRes.respondto === userEmail && connectRes.togetherresponse === 'rejected') {
        this.setState({
          alertState: true,
          alertText: connectRes.rejectmessage,
        });
        setTimeout(() => {
          this.setState({
            alertState: false,
            alertText: '',
          });
        }, 6000);
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
      } else if (connectRes.respondto === userEmail && connectRes.togetherresponse === 'accepted') {
        // this.addStyleString('#togetherjs-container.togetherjs { display: block !important; }');
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

    socket.on('responsePingRequest', (connectReq) => {
    // const gettstatus = window.localStorage.getItem('togetherStatus');

      const userEmail = window.localStorage.getItem('email');


      if (connectReq.senderEmail === userEmail) {
      // const pingStatus = window.localStorage.getItem('pingStatus');
      // window.localStorage.setItem('pingStatus', 0);
        setTimeout(() => {
          const pingStatus = window.localStorage.getItem('pingStatus');
          window.localStorage.setItem('pingStatus', 0);
          if (pingStatus == 1) {
            this.setState({
              alertState: true,
              alertText: `${this.state.requestemail} is unavailable now. Please try later.`,
            });
            setTimeout(() => {
              this.setState({
                alertState: false,
                alertText: '',
              });
            }, 6000);
            this.toggleTogether();
          }
        }, 30000);
      }
    });
    socket.on('urlTogetherChangeRelay', (connectReq) => {
      const myemail = window.localStorage.getItem('togetheruser1email');
      const friendemail = window.localStorage.getItem('togetheruser2email');
      const myurl = window.localStorage.getItem('currurl');


      if (connectReq.rEmail === myemail && connectReq.sEmail === friendemail && myurl !== connectReq.urltoload && connectReq.urltoload.indexOf('togetherjs=') === -1) {
        setTimeout(() => {
          window.self.location = connectReq.urltoload;
        }, 5000);

        setTimeout(() => {
          window.location.reload(false);
        }, 7000);
        this.setState({
          alertState: true,
          alertText: `${friendemail} has  gone to page ${connectReq.urltoload}. Let's go!`,
        });
        setTimeout(() => {
          this.setState({
            alertState: false,
            alertText: '',
          });
        }, 4000);
      }
    });
    socket.on('scrollTogetherChangeRelay', (connectReq) => {
      // const gettstatus = window.localStorage.getItem('togetherStatus');

      const myemail = window.localStorage.getItem('togetheruser1email');
      const friendemail = window.localStorage.getItem('togetheruser2email');


      if (connectReq.rEmail === myemail && connectReq.sEmail === friendemail) {
        window.scrollTo(connectReq.hScroll, connectReq.vScroll);
      }
    });
  }
  componentDidUpdate() {
    const uName = window.localStorage.getItem('name');
    if (uName !== null) {
      window.TogetherJSConfig_getUserName = function () { return uName; };

      window.TogetherJS.refreshUserData();
    }
  }


  onLogin = (userObject) => {
    const cartId = window.localStorage.getItem('cartID');
    const cartContents = [];
    const currurl = window.location.href;
    window.localStorage.setItem('currurl', currurl);
    axios.get(`/api/v1/cart/fetchCart/${cartId}`).then((cartContentsResponse) => {
      if (!(cartContentsResponse.data.message.length === 0)) {
        cartContentsResponse.data.message.forEach((product) => {
          axios.get(`/api/v1/products/${product.productID}`).then((productDetailsResponse) => {
            const productDetails = productDetailsResponse.data.data;
            window.localStorage.setItem(productDetails.productID.toString(), 'ion-checkmark-round');
            cartContents.push(productDetails);
            window.localStorage.setItem('cartContents', JSON.stringify(cartContents));
            this.setState({
              cartContents,
              isAuthenticated: true,
              showLogin: false,

            });
          });
        });
      } else {
        window.localStorage.setItem('cartContents', JSON.stringify(cartContents));
        this.setState({
          cartContents,
          isAuthenticated: true,
          showLogin: false,
        });
      }
    });
  }

  onLogout = () => {
    const togethermyStatus = window.localStorage.getItem('togetherStatus');
    if (this.state.togetherStatus === 1 || togethermyStatus == 1) {
      this.toggleTogether();
    }
    axios.get('/user/logout').then((logoutResponse) => {
      if (logoutResponse.data.statusCode === 200) {
        window.localStorage.clear();
        this.setState({
          isAuthenticated: false,
          cartContents: [],
          showLogin: false,


          showCart: false,

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
    const userEmail = window.localStorage.getItem('email');
    const userName = window.localStorage.getItem('name');
    window.localStorage.setItem('togetheruser1email', userEmail);
    window.localStorage.setItem('togetheruser2email', this.state.requestemail);
    const obj = {
      senderEmail: userEmail,
      senderName: userName,
      requestEmail: this.state.requestemail,
      togetherlink: this.state.togetherlink,

    };
    const pingobj = {
      senderEmail: userEmail,
      requestEmail: this.state.requestemail,
    };
    window.localStorage.setItem('pingStatus', 1);
    setTimeout(() => {
      socket.emit('mypingrequest', pingobj);
    }, 1000);


    socket.emit('connectTogether', obj);
    this.setState({
      showTogetherModal: false,
      alertState: true,
      alertText: 'Request sent',
    });
    setTimeout(() => {
      this.setState({
        alertState: false,
        alertText: '',
      });
    }, 6000);
  }
  handleAcceptTogetherRequest = () => {
    const uName = window.localStorage.getItem('name');
    // alert(uName);
    const email = window.localStorage.getItem('email');
    const sessionstr = this.state.togetherReqfromEmail + email;
    window.localStorage.setItem(' togethersessionid', sessionstr);

    // window.TogetherJSConfig_getUserName = () => uName;
    // window.TogetherJS.refreshUserData();

    const url = `/api/v1/cart/initTogetherCart/${sessionstr}`;
    axios.get(url).then((togetherCart) => {
      const newcartid = togetherCart.data.message;
      if (togetherCart.data.statusCode === 201) {
        const myemail = window.localStorage.getItem('email');
        window.localStorage.setItem('togetheruser1email', myemail);
        window.localStorage.setItem('togetheruser2email', this.state.togetherReqfromEmail);
        const obj = {
          togetherresponse: 'accepted',
          togethercartid: newcartid,
          togethersessionid: sessionstr,

          respondto: this.state.togetherReqfromEmail,
        };
        // window.TogetherJSConfig_getUserName = () => this.state.userName;
        // window.TogetherJS.refreshUserData();
        // setTimeout(() => {
        //   window.TogetherJSConfig_getUserName = () => uName;
        //   window.TogetherJS.refreshUserData();
        // }, 1000);

        socket.emit('connectTogetherResponse', obj);
        window.localStorage.removeItem('cartID');
        window.localStorage.setItem('cartID', newcartid);
        window.localStorage.removeItem('togetherMenuText');
        window.localStorage.setItem('togetherMenuText', 'End Together');
        window.localStorage.removeItem('togetherStatus');
        window.localStorage.setItem('togetherStatus', 1);

        window.localStorage.setItem(' togethersessionid', sessionstr);
        this.setState({
          cartId: newcartid,
          togetherMenuText: 'End Together',
          togetherStatus: 1,
          togethersessionid: sessionstr,
          showTogetherReqModal: false,
        });

        const tlink = window.localStorage.getItem('togetherlink');
        const nowurl = window.location.href;
        const indexcurr = nowurl.lastIndexOf(':');
        const indextog = tlink.lastIndexOf(':');
        const subcurr = nowurl.substring(indexcurr, indexcurr + 18);
        const subtog = nowurl.substring(indextog, indextog + 18);

        const hashindex = tlink.lastIndexOf('#');
        const valbeforehash = tlink.charAt(hashindex - 1);

        if (subcurr === subtog) {
          if (valbeforehash !== '/') {
            const newtlink = `${tlink.substring(0, hashindex)}/${tlink.substring(hashindex)}`;
            window.self.location = newtlink;
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
          } else {
            window.self.location = tlink;
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
          }
        } else if (subcurr != subtog) {
          if (valbeforehash !== '/') {
            const newtlink = `${tlink.substring(0, hashindex)}/${tlink.substring(hashindex)}`;
            window.self.location = newtlink;
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
          } else {
            window.self.location = tlink;
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
          }
        }

        window.TogetherJSConfig_getUserName = () => uName;
        window.TogetherJS.refreshUserData();
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
  addStyleString = (str) => {
    const togethercontainer = document.createElement('style');
    togethercontainer.innerHTML = str;
    document.body.appendChild(togethercontainer);
  };
  addStyleString2 = (str) => {
    const togethercontainer2 = document.createElement('style');
    togethercontainer2.innerHTML = str;
    document.body.appendChild(togethercontainer2);
  };
  toggleTogether = () => {
    const uName = window.localStorage.getItem('name');
    window.TogetherJSConfig_getUserName = () => uName;
    window.TogetherJS.refreshUserData();

    if (this.state.togetherStatus != 1) {
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
          clearInterval(getturl);
        }
      }, 1000);
    } else {
      const userId = window.localStorage.getItem('userID');
      const url = `/api/v1/cart/initCart/${userId}`;

      axios.get(url).then((origCart) => {
        if (origCart.data.statusCode === 200) {
          console.log(origCart.data.message);
          window.localStorage.removeItem(' cartID');
          window.localStorage.removeItem(' togetherMenuText');
          window.localStorage.removeItem(' togetherStatus');
          window.localStorage.removeItem(' togethersessionid');
          window.localStorage.removeItem('togetheruser1email');
          window.localStorage.removeItem('togetheruser1email');
          window.localStorage.setItem('cartID', origCart.data.message.cartID);
          window.localStorage.setItem('togethersessionid', null);
          window.localStorage.setItem('togetherStatus', 0);
          window.localStorage.setItem('togetherMenuText', 'Together');

          this.setState({
            togetherStatus: 0,
            togetherMenuText: 'Together',
            togetherlink: '',
            togetherReqfrom: '',
            togetherReqfromEmail: '',
            togethersessionid: null,
          });
        }
      });
    }
    window.TogetherJS();
  }

  handleCartModalClose = () => {
    this.setState({
      showCart: false,
    });
  }
  handleCartModalOpen = () => {
    this.setState({
      showCart: true,
      cartContents: JSON.parse(window.localStorage.getItem('cartContents')),
    });
  }
  deleteCartContents = (productId, cartId) => {
    const currentCartContents = this.state.cartContents;
    for (let i = 0; i < currentCartContents.length; i += 1) {
      if (currentCartContents[i].productID === productId) {
        axios({
          method: 'delete',
          url: '/api/v1/cart/removeFromCart',
          data: {
            cartId,
            productId,
          },
        }).then((removeFromCartResponse) => {
          if (removeFromCartResponse.data.statusCode === 200) {
            currentCartContents.splice(i, 1);
            window.localStorage.removeItem(productId);
            window.localStorage.setItem('cartContents', JSON.stringify(currentCartContents));
            this.setState({
              cartContents: currentCartContents,
            });
          }
        });
      }
    }
  }
  render() {
    window.addEventListener('scroll', function (event) {
      let top = this.scrollY,
        left = this.scrollX;

      let horizontalScroll = document.querySelector('.horizontalScroll'),
        verticalScroll = document.querySelector('.verticalScroll');
      const myemail = window.localStorage.getItem('togetheruser1email');
      const friendemail = window.localStorage.getItem('togetheruser2email');
      const obj = {
        sEmail: myemail,
        rEmail: friendemail,
        hScroll: left,
        vScroll: top,
      };
      socket.emit('scrollTogetherchange', obj);
      console.log(`Scroll X: ${left}px`, `Scroll Y: ${top}px`);
    }, false);
    const uName = window.localStorage.getItem('name');
    if (uName !== null) {
      window.TogetherJSConfig_getUserName = () => uName;
      window.TogetherJS.refreshUserData();
    }
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const newurllocal = window.location.href;
    const oldurllocal = window.localStorage.getItem('currurl');
    const myemail = window.localStorage.getItem('togetheruser1email');
    const friendemail = window.localStorage.getItem('togetheruser2email');
    if (newurllocal !== oldurllocal) {
      window.localStorage.setItem('currurl', newurllocal);
      const obj = {
        sEmail: myemail,
        rEmail: friendemail,
        urltoload: newurllocal,
      };
      socket.emit('urlTogetherchange', obj);
    }
    // else {
    //   window.TogetherJSConfig_getUserName = () => this.state.userName;
    //   window.TogetherJS.refreshUserData();
    // }

    if (!this.state.isAuthenticated) {
      return (
        <Navbar className="NavbarMain">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" ><div className="NavbarIcon" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} >
                <div
                  className="NavbarText"
                  onClick={() => { this.handleLoginModalOpen(); }}
                >Login / Register
                </div>
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
            <Link to="/" ><div className="NavbarIcon" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight >
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Hi {window.localStorage.getItem('name')}</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.toggleTogether(); }}> <FontAwesomeIcon icon="handshake" /> {this.state.togetherMenuText}</div>
            </NavItem>

            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.handleCartModalOpen(); }}><FontAwesomeIcon icon="shopping-cart" /> {window.localStorage.getItem('togetherStatus') == 1 ? 'Our' : 'My'} Cart</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.onLogout(); }}><FontAwesomeIcon icon="sign-out-alt" /> Logout</div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        <Modal show={this.state.showTogetherModal} onHide={this.handleTogetherModalClose} className="TogetherRequestModal">
          <Modal.Header>
            <Modal.Title className="TogetherModalTitle">Lets Shop Together</Modal.Title>
          </Modal.Header >
          <Modal.Body className="TogetherModalBody">
            <input className="TogetherModalEmailField" type="text" placeholder="Enter the email of a friend to shop with" onChange={this.handleTogetherInputEmail} />
            <button className="TogetherModalSendButton" onClick={this.handleForwardTogetherRequest}>Send request </button>
          </Modal.Body>
          <Modal.Footer>
            <Button className="TogetherModalCloseButton" onClick={this.handleTogetherModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showTogetherReqModal} onHide={this.handleTogetherReqModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Friend {this.state.togetherReqfrom}  Sent a Request to Shop Together</Modal.Title>
          </Modal.Header>
          <Modal.Body className="TogetherModalBody">
            <button className="TogetherModalButton" onClick={this.handleAcceptTogetherRequest}>Accept Request </button>
            <button className="TogetherModalButton" onClick={this.handleRejectTogetherRequest}>Reject Request </button>
          </Modal.Body>
          <Modal.Footer>
            <Button className="TogetherModalCloseButton" onClick={this.handleTogetherReqModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <CartModal
          cartContents={this.state.cartContents}
          handleCartModalClose={this.handleCartModalClose}
          deleteCartContents={(productId, cartId) => { this.deleteCartContents(productId, cartId); }}
          cartId={window.localStorage.getItem('cartID')}
          showCart={this.state.showCart}
        />
        <SnackBar show={this.state.alertState} timer={6000}><p>{this.state.alertText}</p></SnackBar>
      </Navbar>
    );
  }
}


export default MenuMain;

