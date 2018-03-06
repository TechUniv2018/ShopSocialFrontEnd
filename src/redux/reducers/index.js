const defaultState = {
  cartContents: {},
  userId: 0,
  cartId: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADDTOCART':
    case 'REMOVEFROMCART':
    case 'CHECKOUT':
    case 'GETCARTCONTENTS':
    case 'CLEARCART':
    default: return state;
  }
};

export default reducer;
