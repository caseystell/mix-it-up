const express = require('express');
const router = express.Router();
const productsCtrl = require('../../controllers/api/products');

// All routes start with '/api/products'

// GET /api/products
router.get('/', productsCtrl.index);
// GET /api/products/:id
router.get('/:id', productsCtrl.show);
// POST /api/products
router.post('/', productsCtrl.create);
// EDIT /api/products/:id
router.post('/:id/edit', productsCtrl.edit);
// DELETE /api/products/:id
router.delete('/:id', productsCtrl.delete);

module.exports = router;
