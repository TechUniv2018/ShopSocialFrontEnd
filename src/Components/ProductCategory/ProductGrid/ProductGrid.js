import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductBlock from '../ProductBlock/ProductBlock';
import './ProductGrid.css';

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartId: '',
    };
  }

  render() {
    return (<div className="ProductGrid">{this.state.products}</div>);
  }
}

const mapStateToProps = state => ({
  cartId: state.cartId,
});

const mapDispatchToProps = dispatch => ({
  // dispatchGetCartId: resultArr => dispatch(getCartIdAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);


ProductGrid.propTypes = {
  cgory: PropTypes.string.isRequired,
};
