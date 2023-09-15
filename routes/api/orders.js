const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All routes start with '/api'

// GET /api/orders
router.get('/orders', ensureLoggedIn, ordersCtrl.index);
// GET /api/orders/cart
router.get('/orders/cart', ensureLoggedIn, ordersCtrl.cart);
// GET /api/orders/:id
router.get('/orders/:id', ensureLoggedIn, ordersCtrl.show);
// // POST /api/orders/ to order history
router.post('/orders', ensureLoggedIn, ordersCtrl.createOrderHistory);
// POST /api/orders/cart/checkout
router.post('/orders/cart/checkout', ensureLoggedIn, ordersCtrl.checkout);
// POST /api/orders/cart/products/:id
router.post('/orders/cart/products/:id', ensureLoggedIn, ordersCtrl.addToCart);
// PUT /api/orders/cart 
router.put('/orders/cart/qty', ensureLoggedIn, ordersCtrl.setProductQtyInCart);
// DELETE /api/products/:id
router.delete('/products/:id/delete', ensureLoggedIn, ordersCtrl.deleteProduct);

module.exports = router;