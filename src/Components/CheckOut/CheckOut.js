import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from '../FooterMain/FooterMain';
import './CheckOut.css';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: 0,
    };
  }
  contents() {
    if (parseInt(window.localStorage.getItem('togetherStatus')) !== 0) {
      const sessionID = { sessionID: window.localStorage.getItem('togethersessionid') };
      fetch('/api/v1/cart/getCartContentsOfSession', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionID),
      }).then(response => response.json())
        .then((resJSON) => {
          console.log(resJSON.products);
          window.localStorage.setItem('cartContents', JSON.stringify(resJSON.products));
          if (this.state.refresh === 0) { this.setState({ refresh: 1 }); }
        });
    } else {
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
            });
          });
        } else {
          window.localStorage.setItem('cartContents', JSON.stringify(cartContents));
        }
      });
    }
  }
  render() {
    if (parseInt(window.localStorage.getItem('togetherStatus')) !== 0) {
      setTimeout(() => {
        this.contents();
      }, 0);
    } else {
      this.contents();
    }
    let checkOutCartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    const checkOutItems = [];
    let total = 0;
    if ((checkOutCartContents !== null) && (checkOutCartContents !== undefined)) {
      Object.entries(checkOutCartContents)
        .forEach(([index, {
          name, price, image,
        }]) => {
          total += price;
          checkOutItems.push((
            <Col sm={12} md={12}>
              <div className="CheckOutItems">
                <div>
                  <img src={image} className="checkOutImage" alt="" />
                </div>
                <div className="CheckOutProductName">
                  <p>{name}</p>
                </div>
                <div className="CheckOutProductPrice">
                  <p>$ {price}</p>
                </div>
              </div>
            </Col>
          ));
        });
      const promiseReturned = [];
      let flag = 0;
      let time = 0;
      if (parseInt(window.localStorage.getItem('togetherStatus')) !== 0) {
        time = 5000;
      }
      window.setTimeout(() => {
        for (let i = 0; i < checkOutCartContents.length; i += 1) {
          promiseReturned.push(axios({
            method: 'delete',
            url: '/api/v1/cart/removeFromCart',
            data: {
              cartId: window.localStorage.cartID,
              productId: checkOutCartContents[i].productID,
            },
          }));
          window.localStorage.removeItem(checkOutCartContents[i].productID);
          Promise.all(promiseReturned).then((removeFromCartResponse) => {
            for (let i = 0; i < removeFromCartResponse.length; i += 1) {
              if (removeFromCartResponse[i].data.statusCode !== 200) {
                flag = 1;
                console.log(removeFromCartResponse);
              }
            }
            if (flag === 0) {
              checkOutCartContents = [];
              window.localStorage.setItem('cartContents', JSON.stringify([]));
            }
          });
        }
      }, time);
    }
    if (checkOutCartContents !== (undefined || null)) {
      if (checkOutCartContents.length > 0) {
        return (
          <div className="CheckOut">
            <h1 className="CheckOutHeading">Your order has been placed <div className="CheckOut-img" /> </h1>
            <div className="CheckOutContents">
              <Grid>
                <Row className="show-grid">
                  {checkOutItems}
                </Row>
              </Grid>
            </div>
            <div className="CheckOutPrice">Total Amount : $ {total.toFixed(2)}</div>
            <Footer />
          </div>
        );
      }
    }
    return (
      <div className="CheckOut">
        <h1 className="emptyCartMessage">Cart is empty ! Add Items to the cart</h1>
        <Footer />
      </div>
    );
  }
}

export default CheckOut;
