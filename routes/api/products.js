const express = require('express');
const router = express.Router();
const productsCtrl = require('../../controllers/api/products');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All routes start with '/api/products'

// GET /api/products
router.get('/', productsCtrl.index);
// GET /api/products/:id
router.get('/:id', productsCtrl.show);
// GET /api/products/:id/edit
router.get('/:id/edit', ensureLoggedIn, productsCtrl.edit);
// POST /api/products
router.post('/', ensureLoggedIn, productsCtrl.create);
// EDIT /api/products/:id
router.put('/:id', ensureLoggedIn, productsCtrl.update);
// DELETE /api/products/:id
router.delete('/:id', ensureLoggedIn, productsCtrl.delete);

module.exports = router;
