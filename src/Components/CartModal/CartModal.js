import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CartProductContainer from '../CartProductContainer/CartProductContainer';
import './CartModal.css';


class CartModal extends React.Component {
  render() {
    const cartItems = [];
    Object.entries(this.props.cartContents)
      .forEach(([productId, { productName, price, imageUrl }]) => {
        console.log(productId, productName, price, imageUrl);
        cartItems.push((<CartProductContainer
          imageUrl={imageUrl}
          productName={productName}
          productPrice={price}
        />));
      });
    return (
      <div >
        <Modal show={this.props.cartState} onHide={this.props.hideCart}>
          <Modal.Header>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            {cartItems}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideCart}>Close</Button>
            <Button onClick={() => { console.log('Performing checkout'); }}>Checkout</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CartModal.propTypes = {
  cartState: PropTypes.bool.isRequired,
  hideCart: PropTypes.func.isRequired,
  cartContents: PropTypes.object.isRequired,
};

export default CartModal;
