import React from 'react';
import Menu from '../MenuMain/MenuMain';
import ProductContainer from './ProductContainer/ProductContainer';
import './ProductDisplay.css';


class ProductDisplay extends React.Component {
  render() {
    return (
      <div className="product-display">
        <Menu />
        <ProductContainer />
      </div>
    );
  }
}

export default ProductDisplay;
