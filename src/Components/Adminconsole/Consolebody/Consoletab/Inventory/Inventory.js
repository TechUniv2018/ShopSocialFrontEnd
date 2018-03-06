import React from 'react';
import './Inventory.css';
import Addproductbydesc from './Addproductbydesc/Addproductbydesc';
import AddproductbyId from './AddproductbyId/AddproductbyId';
import RemoveProductbyId from './RemoveProductbyId/RemoveProductbyId';
import { Navbar, Nav, NavItem, Alert } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const requestUrladdbyId = '/api/v1/products/add/';
const requestUrlrembyId = '/api/v1/products/remove/';
class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertmsg: '',
      alertremmsg: '',
      alertremtype: '',
      alerttype: '',
      category: 'TVs',
      brand: '',
      quantity: '',
      priceto: '',
      pricefrom: '',
      proid: '',
      remid: '',

    };
    this.handlecategory = this.handlecategory.bind(this);
    this.handlebrand = this.handlebrand.bind(this);
    this.handlequantity = this.handlequantity.bind(this);
    this.handlepriceto = this.handlepriceto.bind(this);
    this.handlepricefrom = this.handlepricefrom.bind(this);
    this.handleproid = this.handleproid.bind(this);
    this.handleremove = this.handleremove.bind(this);
    this.populate = this.populate.bind(this);
    this.remove = this.remove.bind(this);
  }
  handlecategory(evt) {
    this.setState({ category: evt.target.value });
  }
  handlebrand(evt) {
    this.setState({ brand: evt.target.value });
  }
  handlequantity(evt) {
    this.setState({ quantity: evt.target.value });
  }
  handlepricefrom(evt) {
    this.setState({ pricefrom: evt.target.value });
  }
  handlepriceto(evt) {
    this.setState({ priceto: evt.target.value });
  }
  handleproid(evt) {
    this.setState({ proid: evt.target.value });
  }
  handleremove(evt) {
    this.setState({ remid: evt.target.value });
  }
  populate(evt) {
    if (this.state.proid.length != 0) {
      this.setState({ alertmsg: 'Request sent to add the product Waiting for a response', alerttype: 'info' });
      const urltoreq = requestUrladdbyId + this.state.proid;
      console.log(urltoreq);


      fetch(urltoreq)
        .then((response) => {
          response.json().then((text) => {
            if (text.statusCode != '201') {
              this.setState({
                alertmsg: text.action,
                alerttype: 'danger',
              });
            } else {
              this.setState({
                alertmsg: text.action,
                alerttype: 'success',
              });
            }

            // console.log(text);
          });
        });
      // // .then(resp => resp.json())
      // .then(resp => resp.text().then(tex))
      // .catch(err => console.log(err));
    } else if (this.state.brand.length === 0 || this.state.quantity.length === 0 || this.state.pricefrom.length === 0 || this.state.priceto.length === 0) {
      this.setState({ alertmsg: 'Please fill in all the fields', alerttype: 'danger' });
    } else {
      this.setState({ alertmsg: 'Request sent. Waiting for a response', alerttype: 'info' });
      const payload = {
        productCategory: this.state.category,
        productBrand: this.state.brand,
        priceFrom: this.state.pricefrom,
        priceTo: this.state.priceto,
      };
      alert(this.state.category);
      const data = new FormData();
      data.append('payload', JSON.stringify(payload));

      fetch(
        requestUrladdbyId,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      ).then((response) => {
        response.json().then((text) => {
          if (text.statusCode != '201') {
            this.setState({
              alertmsg: text.action,
              alerttype: 'danger',
            });
          } else {
            this.setState({
              alertmsg: text.action,
              alerttype: 'success',
            });
          }

          // console.log(text);
        });
      });
    }
  }
  remove(evt) {
    // Alert-types: "success", "warning", "danger", "info"

    if (this.state.remid.length != 0) {
      this.setState({ alertremmsg: 'Request to remove product sent. Waiting for response', alertremtype: 'info' });
      const urltoreq = requestUrlrembyId + this.state.remid;
      console.log(urltoreq);


      fetch(urltoreq, {
        method: 'delete',
      })
        .then((response) => {
          response.json().then((text) => {
            if (text.statusCode != '200') {
              this.setState({
                alertremmsg: text.message,
                alertremtype: 'danger',
              });
            } else {
              this.setState({
                alertremmsg: text.message,
                alertremtype: 'success',
              });
            }

            // console.log(text);
          });
        });
    } else {
      this.setState({ alertremmsg: 'Plese fil in a product id to remove', alertremtype: 'danger' });
    }
  }
  render() {
    return (
      <Grid >
        <br />
        <div className="Inventory-outer">
          <Row className="Inventory-show-grid">


            <Col xs={12} md={8} lg={2} />

            <Col xs={12} md={8} lg={8} className="Inventory-border-right">

              <div >
                <center> <h2> Add Products </h2> </center>
                <fieldset>
                  <Alert bsStyle={this.state.alerttype}>
                    <strong>{this.state.alertmsg}</strong>
                  </Alert>
                  <Addproductbydesc
                    handlecategory={this.handlecategory}
                    handlebrand={this.handlebrand}
                    handlequantity={this.handlequantity}
                    handlepriceto={this.handlepriceto}
                    handlepricefrom={this.handlepricefrom}
                  />

                  <center> <h4> OR </h4></center>


                  <AddproductbyId handleproid={this.handleproid} />
                  <br /><br />
                  <input type="button" value="Populate" className="Inventory-btn-inventory" onClick={this.populate} />

                </fieldset>

              </div>
            </Col>
            <Col xs={12} md={12} lg={2} />
          </Row>
          <br />     <br />
          <Row className="Inventory-show-grid">


            <Col xs={12} md={8} lg={2} />
            <Col xs={12} md={8} lg={8} className="Inventory-border-right">

              <div >
                <center> <h2> Remove Products </h2> </center>
                <Alert bsStyle={this.state.alertremtype}>
                  <strong>{this.state.alertremmsg}</strong>
                </Alert>
                <fieldset>

                  <RemoveProductbyId handleremove={this.handleremove} />
                  <input type="button" value="Remove" className="Inventory-btn-inventory" onClick={this.remove} />

                </fieldset>

              </div>
            </Col>
            <Col xs={12} md={12} lg={2} />
          </Row>
          <br />

        </div>
      </Grid >

    );
  }
}

export default Inventory;
