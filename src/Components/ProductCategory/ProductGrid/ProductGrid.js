import React from 'react';
import ProductBlock from '../ProductBlock/ProductBlock';

export default class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    const getProductsByCategoryRoute = `https://shop-social-product-api.herokuapp.com/products?category.name${this.props.cgory}`;
    const productsArr = [];
    fetch(getProductsByCategoryRoute)
      .then(result => result.json())
      .then((resJSON) => {
        resJSON.data.forEach((product) => {
          productsArr.push(<ProductBlock
            key={product.id}
            id={product.id}
            price={product.price}
            name={product.name}
            imageUrl={product.image}
            desc={product.description}
          />);
        });
        this.setState({
          products: [...productsArr],
        });
      });
  }
  render() {
    return (<div className="ProductGrid">{this.state.products}</div>);
  }
}
