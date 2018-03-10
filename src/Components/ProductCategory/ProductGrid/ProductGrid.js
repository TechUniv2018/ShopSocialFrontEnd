import React from 'react';
import PropTypes from 'prop-types';
import ProductBlock from '../ProductBlock/ProductBlock';
import './ProductGrid.css';

export default class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    const fromPrice = window.localStorage.getItem('fromRange');
    const toPrice = window.localStorage.getItem('toRange');
    const tempProductsArr = [];
    fetch(`/api/v1/products/${this.props.cgory}?fromPrice=${fromPrice}&toPrice=${toPrice}`)
      .then(res => res.json())
      .then((resJSON) => {
        resJSON.forEach(product =>
          tempProductsArr.push(<ProductBlock
            imageUrl={product.image}
            name={product.name}
            desc={product.description}
            price={product.price}
            id={product.productID}
            cartId={window.localStorage.getItem('cartID')}
            userId={window.localStorage.getItem('userID')}
          />));
      })
      .then(() => this.setState({ products: [...tempProductsArr] }))
      .catch(console.log);
  }

  render() {
    return (<div className="ProductGrid">{this.state.products}</div>);
  }
}

ProductGrid.propTypes = {
  cgory: PropTypes.string.isRequired,
};
