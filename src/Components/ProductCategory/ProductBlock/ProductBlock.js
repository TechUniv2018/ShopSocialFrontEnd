import React from 'react';
import { Link } from 'react-router-dom';
import './ProductBlock.css';

export default class ProductBlock extends React.Component {
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
        </figcaption><i className="ion-android-cart" />
        <Link to={`/product/${this.props.id}`} activeClassName="AddToCart" />
      </figure>
    );
  }
}
