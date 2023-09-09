const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// All routes start with '/api/orders'

// GET /api/orders
router.get('/', ordersCtrl.index);
// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
// GET /api/orders/:id
router.get('/:id', ordersCtrl.show);
// // POST /api/orders/ to order history
// router.post('/', ordersCtrl.add);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);
// POST /api/orders/cart/products/:id
router.post('/cart/products/:id', ordersCtrl.addToCart);
// PUT /api/orders/cart 
router.put('/cart/qty', ordersCtrl.setProductQtyInCart);

module.exports = router;