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

// Delete a product from the cart
export function deleteProductFromCart(productId) {
  return sendRequest(`${BASE_URL}/cart`, 'POST', { productId });
}

// Updates the order's (cart's) isPaid property to true
export function checkout() {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}
