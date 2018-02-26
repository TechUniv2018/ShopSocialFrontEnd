import React from 'react';
import Menu from '../Adminconsole/Menu/Menu';
import ProductContainer from './ProductContainer/ProductContainer';
import './ProductDisplay.css';


class ProductDisplay extends React.Component {
  render() {
    return (
      <div className="abc">
        <Menu />
        <ProductContainer />
      </div>
    );
  }
}

export default ProductDisplay;
