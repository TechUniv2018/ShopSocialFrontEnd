import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './FilterBar.css';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromRange: 0,
      toRange: 10000,
      instantSearch: '',
    };
  }

  sendRange = () => {
    window.localStorage.setItem('fromRange', this.state.fromRange);
    window.localStorage.setItem('toRange', this.state.toRange);
    this.props.triggerFilter();
  }

  render() {
    return (


      <div className="FilterBar">

        <Form className="FilterForm FilterSearch" vertical="true">
          <FormGroup className="FilterFormGroup" controlId="instantSearch">
            <h3 className="FilterFormGroupHeading">Filter by name</h3>
            <ControlLabel className="FilterFormLabel">Search</ControlLabel>{' '}
            <FormControl
              className="FilterFormInput"
              type="text"
              value={this.state.instantSearch}
              onChange={(event) => {
                this.setState({ instantSearch: event.target.value });
              }
            }
              onKeyUp={() => this.props.handleSearch(this.state.instantSearch)}
            />
          </FormGroup>
        </Form>
        <Form className="FilterForm FilterPrice" >
          <FormGroup className="FilterPriceGroupFrom" controlId="fromRange">
            <h3 className="FilterPriceHeadingFrom">Filter by price</h3>
            <ControlLabel className="FilterPriceLabelFrom">From</ControlLabel>{' '}
            <FormControl
              className="FilterPriceInputFrom"
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
          <FormGroup className="FilterPriceGroupTo" controlId="toRange">
            <ControlLabel className="FilterPriceLabelTo">To</ControlLabel>{' '}
            <FormControl
              className="FilterPriceInputTo"
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
          <div bsStyle="info" onClick={this.sendRange} className="FilterButton" role="button" onKeyPress={() => {}}>Filter</div>
        </Form>
      </div>
    );
  }
}

FilterBar.propTypes = {
  triggerFilter: PropTypes.func,
  handleSearch: PropTypes.func,
};

FilterBar.defaultProps = {
  triggerFilter: () => {},
  handleSearch: () => {},
};
