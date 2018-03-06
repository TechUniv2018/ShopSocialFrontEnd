import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductBlock.css';

export default class ProductBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCartIcon: 'ion-android-cart',
    };
  }

  addToCart =() => {
    if (this.state.addToCartIcon === 'ion-android-cart') {
      const productToBeAdded = {
        productId: this.props.id,
        cartId: this.props.cartId,
      };
      fetch('/api/v1/cart/addToCart', {
        method: 'POST',
        body: JSON.stringify(productToBeAdded),
      }).then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.statusCode === 201) {
            this.setState({
              addToCartIcon: 'ion-checkmark-round',
            });
          }
        });
    } else if (this.state.addToCartIcon === 'ion-checkmark-round') {
      const productToBeRemoved = {
        productId: this.props.id,
        cartId: this.props.cartId,
      };
      fetch('/api/v1/cart/removeFromCart', {
        method: 'DELETE',
        body: JSON.stringify(productToBeRemoved),
      }).then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.statusCode === 200) {
            this.setState({
              addToCartIcon: 'ion-android-cart',
            });
          }
        });
    }
  }

  render() {
    return (
      <figure className="ProductBox">
        <img src={this.props.imageUrl} alt={this.props.name} />
        <figcaption>
          <div className="ItemName">{this.props.name}</div>
          <div className="ItemDesc">{this.props.desc}</div>
          <div className="ItemPrice">
            <s>{`$${Number(this.props.price) - 5}`}</s>{`$${this.props.price}`}
          </div>
        </figcaption><i className={this.state.addToCartIcon} />
        <Link to={this.addToCart} activeClassName="AddToCart" />
      </figure>
    );
  }
}

ProductBlock.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  cartId: PropTypes.string.isRequired,
};
