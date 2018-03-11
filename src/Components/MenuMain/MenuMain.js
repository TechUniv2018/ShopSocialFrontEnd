import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
      const cartId = window.localStorage.getItem('cartID');
      const cartContents = [];
      axios.get(`/api/v1/cart/fetchCart/${cartId}`).then((cartContentsResponse) => {
        if (!(cartContentsResponse.data.message.length === 0)) {
          cartContentsResponse.data.message.forEach((product) => {
            axios.get(`/api/v1/products/${product.productID}`).then((productDetailsResponse) => {
              const productDetails = productDetailsResponse.data.data;
              cartContents.push(productDetails);
              console.log(`product details${productDetails}`);
              window.localStorage.setItem('cartContents', JSON.stringify(cartContents));
              this.setState({
                cartContents,
                isAuthenticated: true,
              });
            });
          });
        } else {
          window.localStorage.setItem('cartContents', JSON.stringify(cartContents));
          this.setState({
            cartContents,
            isAuthenticated: true,
          });
        }
      });
    }
  }
  onLogin = (userObject) => {

  }
  onLogout = () => {

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
