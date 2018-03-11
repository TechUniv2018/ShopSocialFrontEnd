import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CartProductContainer from '../CartProductContainer/CartProductContainer';
import './CartModal.css';


class CartModal extends React.Component {
  render() {
    const cartItems = [];
    if ((this.props.cartContents !== null) && (this.props.cartContents !== undefined)) {
      Object.entries(this.props.cartContents)
        .forEach(([index, {
          name, price, image, productID,
        }]) => {
          cartItems.push((<CartProductContainer
            key={index}
            imageUrl={image}
            productName={name}
            productPrice={price}
            productId={productID}
            cartId={this.props.cartId}
            deleteCartContents={(productId, cartId) => {
              this.props.deleteCartContents(productId, cartId);
            }}
          />));
        });
    }
    return (
      <div >
        <Modal show={this.props.showCart} onHide={() => { this.props.handleCartModalClose(); }}>
          <Modal.Header>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            {cartItems.length === 0 ? <h3>Oops! Please add some products</h3> : cartItems}
          </Modal.Body>
          <Modal.Footer>
            <Button className="ModalCartCloseButton" onClick={() => { this.props.handleCartModalClose(); }}> Close</Button>
            <Button className="ModalCartCheckoutButton" onClick={() => { console.log('Performing checkout'); }}> Checkout</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CartModal.propTypes = {
  cartContents: PropTypes.array,
  handleCartModalClose: PropTypes.func.isRequired,
  deleteCartContents: PropTypes.func.isRequired,
  showCart: PropTypes.bool.isRequired,
  cartId: PropTypes.string,
};

CartModal.defaultProps = {
  cartContents: [],
  cartId: 0,
};

export default CartModal;
