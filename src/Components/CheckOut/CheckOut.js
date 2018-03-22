
import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from '../FooterMain/FooterMain';
import './CheckOut.css';

class CheckOut extends React.Component {
  render() {
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
      }
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
