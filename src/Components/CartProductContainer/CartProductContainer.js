import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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
          <button onClick={() => { this.props.deleteCartContents(this.props.productId); }}><FontAwesomeIcon icon="trash-alt" /></button>
        </div>
      </div>
    );
  }
}

CartProductContainer.propTypes = {
  productId: PropTypes.number,
  imageUrl: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.number,
  deleteCartContents: PropTypes.func.isRequired,
};

CartProductContainer.defaultProps = {
  productId: 0,
  imageUrl: '',
  productName: '',
  productPrice: '',
};

export default CartProductContainer;
