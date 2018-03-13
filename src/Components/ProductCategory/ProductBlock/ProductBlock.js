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

  componentWillMount() {
    if (window.localStorage.getItem(this.props.id.toString()) === 'ion-checkmark-round') {
      this.setState({
        addToCartIcon: 'ion-checkmark-round',
      });
    } else {
      this.setState({
        addToCartIcon: 'ion-android-cart',
      });
    }
  }

  addToCart = () => {
    if (this.state.addToCartIcon === 'ion-android-cart') {
      const productToBeAdded = {
        productId: this.props.id,
        cartId: this.props.cartId,
        userId: this.props.userId,
      };
      fetch('/api/v1/cart/addToCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToBeAdded),
      }).then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.statusCode === 201) {
            this.setState({
              addToCartIcon: 'ion-checkmark-round',
            });
            window.localStorage.setItem('cartContents', JSON.stringify([...JSON.parse(window.localStorage.getItem('cartContents')),
              {
                productID: this.props.id,
                name: this.props.name,
                image: this.props.imageUrl,
                price: this.props.price,
              },
            ]));
            window.localStorage.setItem(this.props.id.toString(), 'ion-checkmark-round');
          }
        }).catch(console.log);
    } else if (this.state.addToCartIcon === 'ion-checkmark-round') {
      const productToBeRemoved = {
        productId: this.props.id,
        cartId: this.props.cartId,
        userId: this.props.userId,
      };
      fetch('/api/v1/cart/removeFromCart', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToBeRemoved),
      }).then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.statusCode === 200) {
            this.setState({
              addToCartIcon: 'ion-android-cart',
            });
            const products = JSON.parse(window.localStorage.getItem('cartContents'));
            const tempArr = [];
            products.forEach((product) => {
              if (product.productID !== productToBeRemoved.productId) {
                tempArr.push(product);
              }
            });
            window.localStorage.setItem('cartContents', JSON.stringify(tempArr));
            window.localStorage.removeItem(this.props.id.toString());
          }
        }).catch(console.log);
    }
  }

  render() {
    return (
      <figure className="ProductBox">
        <img src={this.props.imageUrl} alt={this.props.name} />
        <figcaption>
          <div className="ItemName">{this.props.name}</div>
          <div className="ItemDesc">{this.props.desc.substr(0, this.props.desc.lastIndexOf(' ', 80))}</div>
          <div className="ItemPrice">
            <s>{`$${Number(this.props.price) + 5}`}</s>{`$${this.props.price}`}
          </div>
        </figcaption><button
          className={this.state.addToCartIcon}
          onClick={this.addToCart}
          onKeyPress={() => {}}
        />
        <Link to={`/product/${this.props.id}`} className="AddToCart" />
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
  userId: PropTypes.string.isRequired,
};
