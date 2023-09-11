const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// All routes start with '/api'

// GET /api/orders
router.get('/orders', ordersCtrl.index);
// GET /api/orders/cart
router.get('/orders/cart', ordersCtrl.cart);
// GET /api/orders/:id
router.get('/orders/:id', ordersCtrl.show);
// // POST /api/orders/ to order history
router.post('/orders', ordersCtrl.createOrderHistory);
// POST /api/orders/cart/checkout
router.post('/orders/cart/checkout', ordersCtrl.checkout);
// POST /api/orders/cart/products/:id
router.post('/orders/cart/products/:id', ordersCtrl.addToCart);
// PUT /api/orders/cart 
router.put('/orders/cart/qty', ordersCtrl.setProductQtyInCart);
// DELETE /api/products/:id
router.delete('/products/:id', ordersCtrl.deleteProduct);

module.exports = router;