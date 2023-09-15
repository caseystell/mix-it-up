const Order = require('../../models/order');
const Product = require('../../models/product');

module.exports = {
  cart,
  addToCart,
  checkout,
  index,
  show,
  createOrderHistory,
  setProductQtyInCart,
  deleteProduct
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add a product to the cart
async function addToCart(req, res) {
 const cart = await Order.getCart(req.user._id);
 await cart.addProductToCart(req.params.id);
 res.json(cart);
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}

// Updates a product's qty in the cart
async function setProductQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setProductQty(req.body.productId, req.body.newQty); 
  res.json(cart);
}

// Get All orders
async function index(req, res) {
  const orders = await Order.find({ user: req.user._id});
  res.json(orders);
}

// Get order by orderId
async function show(req, res) {
  const order = await Order.findById(req.body.orderId);
  res.json(order);
}

// When a cart changes to 'isPaid', copies cart to order history
async function createOrderHistory(req, res) {
  const order = await Order.findById(req.params.id);
  await order.addOrderToOrderHistory(req.body.orderId);
  res.json(order);
}

async function deleteProduct(req, res) {
  const orders = await Order.getAllOrders(req.user._id);
  const mostRecentOrder = orders.at(-1);
  console.log(`most recent order: ${mostRecentOrder}`)
  const lineItemIds = await mostRecentOrder.lineItems.map(lineItem => lineItem.product._id.toString());
  console.log(`lineitemids are ${lineItemIds}`)
  for (let lineItemId in lineItemIds) {
    await Order.removeSoldProduct(lineItemId);
  }
  res.json(orders);
}

