export const addToCartAction = productObject => ({
  type: 'ADDTOCART',
  payload: { productObject },
});
export const removeFromCartAction = productId => ({
  type: 'REMOVEFROMCART',
  payload: { productId },
});
export const checkOutAction = () => ({
  type: 'CHECKOUT',
});
export const getCartContentsAction = () => ({
  type: 'GETCARTCONTENTS',
});
export const clearCartAction = () => ({
  type: 'CLEARCART',
});
