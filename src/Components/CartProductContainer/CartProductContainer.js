import React from 'react';
import PropTypes from 'prop-types';
import './CartProductContainer.css';


class CartProductContainer extends React.Component {
  render() {
    return (
      <div className="cart-product-container">
        <div className="cart-product-image">
          <img src={this.props.imageUrl} alt="Product" />
        </div>
        <div className="cart-product-name">
          <p>{this.props.productName}</p>
        </div>
        <div className="cart-product-price">
          <p>{this.props.productPrice}</p>
        </div>
        <div className="cart-product-remove-btn">
          <button>Remove</button>
        </div>
      </div>
    );
  }
}

CartProductContainer.propTypes = {
  imageUrl: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.number,
};

CartProductContainer.defaultProps = {
  imageUrl: '',
  productName: '',
  productPrice: '',
};

export default CartProductContainer;
