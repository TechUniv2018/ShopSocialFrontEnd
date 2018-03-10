import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './FilterBar.css';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromRange: 0,
      toRange: 10000,
    };
  }
  sendRange = () => {
    window.localStorage.setItem('fromRange', this.state.fromRange);
    window.localStorage.setItem('fromRange', this.state.fromRange);
  }
  render() {
    return (
      <div className="FilterBar">
        <Form inline>
          <FormGroup controlId="fromRange">
            <ControlLabel>From</ControlLabel>{' '}
            <FormControl
              type="number"
              placeholder="0"
              value={this.state.fromRange}
              onChange={(event) => {
                if (event.target.value >= 0) {
                  this.setState({ fromRange: event.target.value });
                }
              }}
            />
          </FormGroup>{' '}
          <FormGroup controlId="toRange">
            <ControlLabel>To</ControlLabel>{' '}
            <FormControl
              type="number"
              placeholder="10000"
              value={this.state.toRange}
              onChange={(event) => {
                if (event.target.value >= this.state.fromRange) {
                  this.setState({ toRange: event.target.value });
                }
              }}
            />
          </FormGroup>{' '}
          <Button bsStyle="info" onClick={this.sendRange}>Info</Button>
        </Form>;
      </div>
    );
  }
}
