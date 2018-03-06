import React from 'react';
import PropTypes from 'prop-types';
import ProductGrid from './ProductGrid/ProductGrid';
import FilterBar from './FilterBar/FilterBar';

import './ProductCategory.css';

export default class ProductCategory extends React.Component {
  render() {
    return (
      <div className="ProductCategory">
        <div className="col-25">
          <FilterBar />
        </div>
        <div className="col-75">
          <ProductGrid cgory={this.props.match.params.cgory} />
        </div>
      </div>
    );
  }
}

ProductCategory.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cgory: PropTypes.string,
    }),
  }).isRequired,
};
