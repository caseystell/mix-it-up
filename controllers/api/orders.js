const Order = require('../../models/order');
const Product = require('../../models/product');

module.exports = {
  cart,
  addToCart,
  checkout,
  delete: deleteFromCart,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
async function addToCart(req, res) {
 const cart = await Order.getCart(req.user._id);
 await cart.addItemToCart(req.params.id);
 res.json(cart);
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save(); 
  res.json(cart);
}

// Buyer can delete product from cart
async function deleteFromCart(req, res) {
    const cart = await Order.getCart(req.user._id);
    await cart.findByIdAndDelete(req.params.id);
    res.json(cart);
}

// Buyer can add a product to their favorites list