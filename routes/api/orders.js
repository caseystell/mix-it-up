const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// All routes start with '/api/orders'

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
// POST /api/orders/cart/products/:id
router.post('/cart/products/:id', ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);
// DELETE /api/orders/cart/products/:id
router.delete('/cart/products/:id', ordersCtrl.delete);

module.exports = router;