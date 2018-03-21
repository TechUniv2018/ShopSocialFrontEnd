import React from 'react';
import { Grid, Row, Col, Image, Button, Well } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Footer from '../../FooterMain/FooterMain';
import './ProductContainer.css';

const requestUrlbyId = '/api/v1/products/';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: 'No product to Show',
      productPrice: '',
      productDesc: '',
      productModel: '',
      productImage: '',
      productUpc: '',
      productCartStatus: 0,
      cartId: -1,
      productId: -1,
      userId: -1,
    };
  }

  componentDidMount() {
    const currentUrl = (window.location.href);
    const result = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    if (result !== currentUrl) {
      fetch(requestUrlbyId + result)
        .then((response) => {
          response.json().then((text) => {
            if (text.statusCode === 200) {
              const descArray = text.data.description.split(';');
              for (let i = 0; i < descArray.length; i += 1) {
                descArray[i] = `${descArray[i]}\n`;
              }
              this.setState({
                productName: text.data.name,
                productPrice: text.data.price,
                productDesc: descArray,
                productMan: text.data.manufacturer,
                productModel: text.data.model,
                productImage: text.data.image,
                productUpc: text.data.upc,
                productId: text.data.productID,
                cartId: window.localStorage.getItem('cartID'),
                userId: window.localStorage.getItem('userID'),
              });
              const cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
              if (cartContents !== null) {
                cartContents.forEach((product) => {
                  if (product.productID === this.state.productId) {
                    this.setState({
                      productCartStatus: 1,
                    });
                  }
                });
              }
            } else {
              this.setState({
                productName: 'No product to Show',
              });
            }
          });
        });
    }
  }

  addProductToCart = () => {
    console.log(this.state);
    if (this.state.productCartStatus === 0) {
      fetch('/api/v1/cart/addToCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: this.state.cartId,
          productId: this.state.productId,
          userId: this.state.userId,
        }),
      })
        .then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.statusCode === 201) {
            this.setState({
              productCartStatus: 1,
            });
            window.localStorage.setItem(this.state.productId, 'ion-checkmark-round');
            window.localStorage.setItem('cartContents', JSON.stringify([...JSON.parse(window.localStorage.getItem('cartContents')),
              {
                productID: this.state.productId,
                name: this.state.productName,
                image: this.state.productImage,
                price: this.state.productPrice,
              },
            ]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
      const tempProdArr = [];
      cartContents.forEach((product) => {
        if (product.productID !== this.state.productId) {
          tempProdArr.push(product);
        } else {
          fetch('/api/v1/cart/removeFromCart', {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartId: this.state.cartId,
              productId: this.state.productId,
            }),
          })
            .then(response => response.json())
            .catch(console.log);
        }
      });
      window.localStorage.setItem('cartContents', JSON.stringify(tempProdArr));
      window.localStorage.removeItem(this.state.productId);
      this.setState({
        productCartStatus: 0,
      });
    }
  }

  render() {
    if (window.localStorage.getItem('userID') === null) {
      return (
        <div>
          <Grid className="ProductDisplay">
            <Row>
              <Col xs={6} sm={6} md={2} lg={2} className="ProductDisplayImageIcon">
                <Well>
                  <center> <Image src={this.state.productImage} responsive /> </center>
                </Well>
                <div className="ProductImagePickerArrow">
                  <FontAwesomeIcon icon="arrow-circle-down" className="ProductImagePickerArrow" />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="ProductDisplayImage">
                <center> <Image src={this.state.productImage} responsive /> </center>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} className="ProductDetailsContainer">
                <h2 className="ProductDetailName"> {this.state.productName} </h2>
                <h3 className="ProductDetailDisplayPrice">Best buy @ &#8377; {this.state.productPrice}</h3>
                <div>
                  <center>
                    <Button onClick={() => { }} className="ProductDetailsCartButton">Login to shop!</Button>
                  </center>
                </div>
                <Well className="ProductDetailDescContainer">
                  <h3>The product:</h3>
                  <p>{this.state.productDesc}</p>
                  <h3>Manufacturer:</h3>
                  <p>{this.state.productMan}</p>
                  <h3>Model:</h3>
                  <p>{this.state.productModel}</p>
                  <h3>UPC:</h3>
                  <p>{this.state.productUpc}</p>
                </Well>
              </Col>
            </Row>
            <h4 className="ProductPermaLink"><FontAwesomeIcon icon="link" /> http://www.shopsocial.com/product/{this.state.productId}</h4>
          </Grid>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Grid className="ProductDisplay">
          <Row>
            <Col xs={6} sm={6} md={2} lg={2} className="ProductDisplayImageIcon">
              <Well>
                <center> <Image src={this.state.productImage} responsive /> </center>
              </Well>
              <div className="ProductImagePickerArrow">
                <FontAwesomeIcon icon="arrow-circle-down" className="ProductImagePickerArrow" />
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className="ProductDisplayImage">
              <center> <Image src={this.state.productImage} responsive /> </center>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} className="ProductDetailsContainer">
              <h2 className="ProductDetailName"> {this.state.productName} </h2>
              <h3 className="ProductDetailDisplayPrice">Best buy @ &#8377; {this.state.productPrice}</h3>
              <div>
                <center>
                  <Button onClick={() => { this.addProductToCart(); }} className="ProductDetailsCartButton">{ this.state.productCartStatus === 0 ? 'Add to cart' : 'In cart'}</Button>
                </center>
              </div>
              <Well className="ProductDetailDescContainer">
                <h3>The product:</h3>
                <p>{this.state.productDesc}</p>
                <h3>Manufacturer:</h3>
                <p>{this.state.productMan}</p>
                <h3>Model:</h3>
                <p>{this.state.productModel}</p>
                <h3>UPC:</h3>
                <p>{this.state.productUpc}</p>
              </Well>
            </Col>
          </Row>
          <h4 className="ProductPermaLink"><FontAwesomeIcon icon="link" /> http://www.shopsocial.com/product/{this.state.productId}</h4>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default ProductContainer;
