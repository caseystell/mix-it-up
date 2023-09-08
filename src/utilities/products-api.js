import sendRequest from "./send-request";
const BASE_URL = '/api/products';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(productId) {
  return sendRequest(`${BASE_URL}/${productId}`);
}

export function createProduct(formData) {
  return sendRequest(BASE_URL, 'POST', formData);
}

export function editProduct(productId) {
  return sendRequest(`${BASE_URL}/${productId}/edit`);
}

export function updateProduct(productId, formData) {
  return sendRequest(`${BASE_URL}/${productId}`, 'PUT', formData);
}

export function deleteProduct(productId) {
  return sendRequest(`${BASE_URL}/${productId}`, 'DELETE', {productId});
}