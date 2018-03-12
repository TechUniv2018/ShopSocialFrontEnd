import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import RegisterLoginModal from '../RegisterLoginModal/RegisterLoginModal';
import CartModal from '../CartModal/CartModal';
import './MenuMain.css';

class MenuMain extends React.Component {
  state={
    isAuthenticated: false,
    cartContents: [],
    showLogin: false,
    showCart: false,
    isSocial: false,
  }
  componentDidMount() {
    if (window.localStorage.getItem('email') !== null) {
      this.setState({
        cartContents: JSON.parse(window.localStorage.getItem('cartContents')),
        isAuthenticated: true,
        showLogin: false,
      });
    }
  }
  onLogin = () => {
    const cartId = window.localStorage.getItem('cartID');
    const cartContents = [];
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
    axios.get('/user/logout').then((logoutResponse) => {
      if (logoutResponse.data.statusCode === 200) {
        window.localStorage.clear();
        this.setState({
          isAuthenticated: false,
          cartContents: [],
          showLogin: false,
          showCart: false,
          isSocial: false,
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
            <Nav pullRight classname="NavbarMain">
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
          <Nav pullRight classname="NavbarMain">
            <NavItem eventKey={1} href="#">
              <div className="NavbarText">Hi {window.localStorage.getItem('name')}</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText"><FontAwesomeIcon icon="handshake" /> {this.state.isSocial ? 'Shop Personal' : 'Shop Together'} </div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.handleCartModalOpen(); }}><FontAwesomeIcon icon="shopping-cart" /> {this.state.isSocial ? 'Our' : 'My'} Cart</div>
            </NavItem>
            <NavItem eventKey={1} href="#">
              <div className="NavbarText" onClick={() => { this.onLogout(); }}><FontAwesomeIcon icon="sign-out-alt" /> Logout</div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        <CartModal
          cartContents={this.state.cartContents}
          handleCartModalClose={this.handleCartModalClose}
          deleteCartContents={(productId, cartId) => { this.deleteCartContents(productId, cartId); }}
          cartId={window.localStorage.getItem('cartID')}
          showCart={this.state.showCart}
        />
      </Navbar>
    );
  }
}

export default MenuMain;
