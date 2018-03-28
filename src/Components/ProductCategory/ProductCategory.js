import React from 'react';
import PropTypes from 'prop-types';
import ProductGrid from './ProductGrid/ProductGrid';
import FilterBar from './FilterBar/FilterBar';
import ProductBlock from './ProductBlock/ProductBlock';
import Footer from '../FooterMain/FooterMain';
import './ProductCategory.css';

export default class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsForSearch: [],
    };
  }

  componentWillMount() {
    this.getProducts(0, 10000);
  }

  getProducts = (fromPrice, toPrice) => {
    const tempProductsArr = [];
    fetch(`/api/v1/products/category/${this.props.match.params.cgory}?fromPrice=${fromPrice}&toPrice=${toPrice}`)
      .then(res => res.json())
      .then((resJSON) => {
        if (resJSON.statusCode === 200) {
          resJSON.data.forEach(product =>
            tempProductsArr.push(<ProductBlock
              imageUrl={product.image}
              name={product.name}
              desc={product.description}
              price={product.price}
              id={product.productID}
              key={product.productID}
            />));
        } else if (resJSON.statusCode === 404) {
          tempProductsArr.push(<div className="NothingFound"><div className="NothingFoundText">Oops! Nothing was found</div></div>);
        }
      })
      .then(() => this.setState({
        products: [...tempProductsArr],
        productsForSearch: [...tempProductsArr],
      }))
      .catch(console.log);
  }

triggerFilter = () => {
  const fromPrice = window.localStorage.getItem('fromRange') === null ? 0 : window.localStorage.getItem('fromRange');
  const toPrice = window.localStorage.getItem('toRange') === null ? 10000 : window.localStorage.getItem('toRange');
  this.getProducts(fromPrice, toPrice);
}

handleSearch = (searchWord) => {
  const tempProductsArr = [];
  this.state.products.forEach((product) => {
    if (product.props.name.toUpperCase().includes(searchWord.toUpperCase())) {
      tempProductsArr.push(product);
    }
  });
  this.setState({
    productsForSearch: [...tempProductsArr],
  });
}

render() {
  if (this.state.productsForSearch.length === 0) {
    return (
      <div>
        <div className="ProductCategory">
          <div className="col-15">
            <FilterBar triggerFilter={this.triggerFilter} handleSearch={this.handleSearch} />
          </div>
          <div className="noproductsfound"><h1 className="noproductsfoundText">No Match Found.</h1></div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  return (
    <div>
      <div className="ProductCategory">
        <div className="col-15">
          <FilterBar triggerFilter={this.triggerFilter} handleSearch={this.handleSearch} />
        </div>
        <div className="col-85">
          <ProductGrid products={this.state.productsForSearch} />
        </div>
      </div>
      {/* <Footer /> */}
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
