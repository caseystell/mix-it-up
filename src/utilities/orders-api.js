import sendRequest from './send-request';
const BASE_URL = '/api/orders';

// Retrieve an unpaid order for the logged in user
export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

// Add product to the cart
export function addProductToCart(productId) {
  return sendRequest(`${BASE_URL}/cart/products/${productId}`, 'POST');
}

// Set product's qty in cart
export function setProductQtyInCart(productId, newQty) {
  return sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { productId, newQty });
}

// Updates the order's (cart's) isPaid property to true
export function checkout() {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}
