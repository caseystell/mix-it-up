import sendRequest from "./send-request";
const BASE_URL = '/api/products';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function createProduct(formData) {
  return sendRequest(BASE_URL, 'POST', formData);
}

export function editProduct(productId) {
  return sendRequest(`${BASE_URL}/${productId}`, 'POST', { productId });
}

export function deleteProduct(productId) {
  return sendRequest(`${BASE_URL}/${productId}`, 'POST', { productId });
}