import React from 'react';
import PropTypes from 'prop-types';
import ProductGrid from './ProductGrid/ProductGrid';
import FilterBar from './FilterBar/FilterBar';
import ProductBlock from './ProductBlock/ProductBlock';
import './ProductCategory.css';

export default class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromPrice: 0,
      toPrice: 10000,
    };
  }

  getProducts = () => {
    const tempProductsArr = [];
    fetch(`/api/v1/products/category/${this.props.match.params.cgory}?fromPrice=${this.state.fromPrice}&toPrice=${this.state.toPrice}`)
      .then(res => res.json())
      .then((resJSON) => {
        resJSON.data.forEach(product =>
          tempProductsArr.push(<ProductBlock
            imageUrl={product.image}
            name={product.name}
            desc={product.description}
            price={product.price}
            id={product.productID}
            cartId={window.localStorage.getItem('cartID')}
            userId={window.localStorage.getItem('userID')}
            key={product.productID}
          />));
      })
      .then(() => this.setState({
        products: [...tempProductsArr],
      }))
      .catch(console.log);
  }

triggerFilter = () => {
  const fromPrice = window.localStorage.getItem('fromRange') === null ? 0 : window.localStorage.getItem('fromRange');
  const toPrice = window.localStorage.getItem('toRange') === null ? 10000 : window.localStorage.getItem('toRange');
  this.setState({
    fromPrice,
    toPrice,
  });
}

render() {
  this.getProducts();
  return (
    <div className="ProductCategory">
      <div className="col-15">
        <FilterBar triggerFilter={this.triggerFilter} />
      </div>
      <div className="col-85">
        <ProductGrid products={this.state.products} />
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
