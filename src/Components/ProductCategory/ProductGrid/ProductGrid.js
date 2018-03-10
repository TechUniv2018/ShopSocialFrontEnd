import React from 'react';
import PropTypes from 'prop-types';
import './ProductGrid.css';

export default class ProductGrid extends React.Component {
  render() {
    return (<div className="ProductGrid">{this.props.products}</div>);
  }
}

ProductGrid.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  products: PropTypes.array,
};

ProductGrid.defaultProps = {
  products: [],
};
