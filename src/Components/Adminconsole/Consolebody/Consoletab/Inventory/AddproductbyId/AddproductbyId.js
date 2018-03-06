import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

function FieldGroup({
  id, label, help, ...props
}) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
    </FormGroup>
  );
}

class AddproductbyId extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="brand"
            type="number"
            placeholder="Product Id "
            onChange={this.props.handleproid}
          />
        </form>
      </div>
    );
  }
}
AddproductbyId.propTypes = {
  handleproid: PropTypes.func.isRequired,

};
export default AddproductbyId;
