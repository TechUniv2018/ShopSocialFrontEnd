import React from 'react';
import ContentLoader from 'react-content-loader';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';

import './ProductContainer.css';

const requestUrlbyId = '/api/v1/products/';

const MyLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={2}
    primaryColor="#100922"
    secondaryColor="#ecebeb"
  >
    <rect x="226" y="60" rx="3" ry="3" width="70" height="10" />
    <rect x="220" y="132" rx="3" ry="3" width="100" height="10" />
    <rect x="313" y="59" rx="3" ry="3" width="10" height="10" />
    <rect x="208" y="107" rx="3" ry="3" width="130" height="10" />
    <rect x="206" y="84" rx="3" ry="3" width="130" height="10" />
    <rect x="118" y="133" rx="3" ry="3" width="90" height="10" />
    <rect x="133" y="107" rx="3" ry="3" width="60" height="10" />
    <rect x="333" y="132" rx="3" ry="3" width="60" height="10" />
    <rect x="351" y="106" rx="3" ry="3" width="30" height="10" />
    <rect x="9.5" y="23.05" rx="0" ry="0" width="97" height="157" />
    <rect x="146.5" y="42.05" rx="0" ry="0" width="0" height="0" />
  </ContentLoader>
);
class ProductContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'after',
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
  }

  render() {
    if (this.state.show === 'pre') {
      return (
        <div className="product-container-loader">
          <Grid>
            <MyLoader />
          </Grid>
        </div>
      );
    }
    return (
      <div className="product-container-flex">
        <Grid className="product-view-card">
          <Row className="show-grid product-container-display-body card">
            <div className="product-display-card-contents">
              <Row>
                <Col xs={12} sm={12} md={7} lg={7} >
                  <center> <Image src={this.state.productImage} responsive /> </center>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5}>
                  <h2> {this.state.productName} </h2>
                  <strong className="product-price"> <h3><p> Best buy @ &#8377; {this.state.productPrice} </p> </h3> </strong>
                  <div>
                    <center><Button onClick={() => { this.addProductToCart(); }} className="btn-product-view">{this.state.productCartStatus === 0 ? 'Add to cart' : 'In cart'} </Button> </center>
                  </div>
                </Col>
              </Row>
              <Row>
                <br />
                <Col >
                  <div>
                    <h1> Description </h1>
                    <p className="product-desc-text"> {this.state.productDesc} </p>
                  </div>
                  <div />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <div className="product-manufacturer" >
                    <h3>Manufacturer: <h5>{this.state.productMan}</h5></h3>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <div className="product-model" >
                    <h3>Model: <h5>{this.state.productModel}</h5></h3>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <div className="product-upc" >
                    <h3>UPC: <h5>{this.state.productUpc}</h5></h3>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProductContainer;
