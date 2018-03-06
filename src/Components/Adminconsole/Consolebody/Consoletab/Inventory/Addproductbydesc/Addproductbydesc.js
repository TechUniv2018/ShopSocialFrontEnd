import React from 'react';
import './Addproductbydesc.css';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';


function FieldGroup({
  id, ...props
}) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
    </FormGroup>
  );
}
class Addproductbydesc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="addbydesc">

        <select onChange={this.props.handlecategory} className="AddProductsbydescdropdown">
          <option value="" disabled="disabled" selected="selected">Please select a Category</option>
          <option value="TVs">TV's</option>
          <option value="Appliances">Appliances</option>
        </select>

        <br />
        <br />
        <form>
          <FieldGroup
            id="brand"
            type="text"
            placeholder="Brand"
            onChange={this.props.handlebrand}
          />
          <FieldGroup
            id="quantity"
            type="number"
            className="quantity"
            placeholder="Quantity"
            onChange={this.props.handlequantity}
          />
          <FieldGroup
            id="pricefrom"
            type="number"

            placeholder="Price From  "
            onChange={this.props.handlepricefrom}
          />
          <FieldGroup
            id="priceto"
            type="number"

            placeholder="Price To  "
            onChange={this.props.handlepriceto}
          />
        </form>
      </div>
    );
  }
}
Addproductbydesc.propTypes = {
  handlebrand: PropTypes.func.isRequired,
  handlecategory: PropTypes.func.isRequired,
  handlepricefrom: PropTypes.func.isRequired,
  handlepriceto: PropTypes.func.isRequired,
  handlequantity: PropTypes.func.isRequired,

};

export default Addproductbydesc;
