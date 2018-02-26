import React from 'react';
import './ProductContainer.css';
import { Grid, Row, Col, Image, Button, Table } from 'react-bootstrap';


import ContentLoader from 'react-content-loader';

const requestUrlbyId = '/api/v1/products/';

// const MyFacebookLoader = () => <Facebook />;
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
      show: 'pre',
      productName: 'No product to Show',
      productPrice: '',
      productDesc: '',
      prouctModel: '',
      productimage: '',
      productUpc: '',
    };
    setTimeout(() => { this.setState({ show: 'after' }); }, 3000);
  }
  componentDidMount() {
    const currentUrl = (window.location.href);
    const result = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    if (result != currentUrl) {
      fetch(requestUrlbyId + result)
        .then((response) => {
          response.json().then((text) => {
            if (text.statusCode == '200') {
              const desc_array = text.data.description.split(';');
              for (let i = 0; i < desc_array.length; i++) {
                desc_array[i] = `${desc_array[i]}\n`;
              }
              this.setState({
                productName: text.data.name,
                productPrice: text.data.price,
                productDesc: desc_array,
                productMan: text.data.manufacturer,
                prouctModel: text.data.model,
                productimage: text.data.image,
                productUpc: text.data.upc,

              });
            } else {
              this.setState({
                productName: 'No product to Show',
              });
            }

          // console.log(text);
          });
        });
    }
  }

  render() {
    if (this.state.show === 'pre') {
      return (
        <div className="ProductContainer-loader">
          <Grid>
            <MyLoader />

          </Grid>
        </div>
      );
    }
    return (
      <div className="ProductContainer-flex">
        <Grid>

          <Row className="show-grid" className="ProductContainer-displaybody" className="card">
            <Col xs={12} sm={3} md={3} lg={3} >
              <center> <Image src={this.state.productimage} responsive /> </center>
            </Col>

            <Col xs={12} sm={9} md={9} lg={9}>
              <div>
                <center> <h3> {this.state.productName} </h3>        </center>
                <center><strong> <h1><p> &#8377; {this.state.productPrice} </p> </h1> </strong> </center>
              </div>

              <div>
                <center> <h4> DESCRIPTION </h4>        </center>
                <p> {this.state.productDesc} </p>
              </div>

              <div>
                <center><Button className="btn-product-view">Add to Cart </Button> </center>
              </div>
              <div>
                <Table responsive>
                  <thead>
                    <tr>

                      <th>Manufacture</th>
                      <td>{this.state.productMan}</td>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Model</th>

                      <td>{this.state.prouctModel}</td>

                    </tr>

                    <tr>
                      <th>UPC</th>
                      <td>{this.state.productUpc} </td>

                    </tr>
                  </tbody>
                </Table>
              </div>

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProductContainer;
