import { GET_CART_ID } from '../actions';

const defaultState = {
  cartContents: {},
  userId: 0,
  cartId: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CART_ID:
      return state.cartId;
    case 'ADDTOCART':
    case 'REMOVEFROMCART':
    case 'CHECKOUT':
    case 'GETCARTCONTENTS':
    case 'CLEARCART':
    default: return state;
  }
};

export default reducer;
