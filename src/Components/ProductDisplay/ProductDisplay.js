import React from 'react';
import Menu from '../MenuMain/MenuMain';
import ProductContainer from './ProductContainer/ProductContainer';
import './ProductDisplay.css';


class ProductDisplay extends React.Component {
  state = {
    isAuthenticated: 'no',
  }
  render() {
    return (
      <div className="product-display">
        <Menu isAuthenticated={this.state.isAuthenticated} />
        <ProductContainer />
      </div>
    );
  }
}

export default ProductDisplay;
