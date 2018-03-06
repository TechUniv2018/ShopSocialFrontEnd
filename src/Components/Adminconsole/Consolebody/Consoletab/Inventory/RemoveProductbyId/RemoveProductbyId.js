import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './RemoveProductbyId.css';

function FieldGroup({
  id, ...props
}) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
    </FormGroup>
  );
}
class RemoveProductbyId extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RemoveProductbyId-layout">
        <form>
          <FieldGroup
            id="brand"
            type="text"
            onChange={this.props.handleremove}
            placeholder="Product Id "
          />
        </form>

        <br />    <br />
      </div>
    );
  }
}

RemoveProductbyId.propTypes = {
  handleremove: PropTypes.func.isRequired,

};
export default RemoveProductbyId;
