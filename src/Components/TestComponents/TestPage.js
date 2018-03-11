import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import './TestPage.css';
import CartModal from '../CartModal/CartModal';

class TestPage extends React.Component {
    state={
      showCart: false,
      cartContents: {},
    }
    componentWillMount() {
      this.setState({
        cartContents: {
          123: {
            productName: 'Cat Image One',
            imageUrl: 'http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg',
            price: 20,
          },
          456: {
            productName: 'Cat Image Two',
            imageUrl: 'http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg',
            price: 30,
          },
        },
      });
    }
    showCart = () => {
      this.setState({
        showCart: true,
      });
    }
      hideCart = () => {
        this.setState({
          showCart: false,
        });
      }
      render() {
        return (
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">ShopSocial</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={1} href="#" onClick={() => { this.showCart(); }}>
                Cart
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <CartModal
              showCart={this.showCart}
              hideCart={this.hideCart}
              cartState={this.state.showCart}
              cartContents={this.state.cartContents}
            />
          </div>
        );
      }
}

export default TestPage;
