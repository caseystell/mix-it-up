const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./productSchema');
const orders = require('../controllers/api/orders');

const lineItemSchema = new Schema({
    product: productSchema,
    qty: { type: Number, default: 1 }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lineItems: [lineItemSchema],
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, product) => total + product.product.price, 0);
});

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, product) => total + product.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    );
};

orderSchema.methods.addProductToCart = async function (productId) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem) {
        return;
    } else {
        const Product = mongoose.model('Product');
        const product = await Product.findById(productId);
        cart.lineItems.push({ product });
    }
    return cart.save();
};

orderSchema.methods.setProductQty = function(productId, newQty) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.toString() === productId);
    if (lineItem && newQty <= 0) {
      cart.lineItems = cart.lineItems.filter(lineItem => lineItem.product._id.toString() !== productId);
    } else if (lineItem) {
      lineItem.qty = newQty;
    }
    return cart.save();
};

orderSchema.statics.getOrder = function(userId, orderId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: true },
        { user: userId },
        { order: orderId},
        { upsert: true, new: true }
    );
};

orderSchema.methods.addOrderToOrderHistory = async function (productId) {
    const order = this;
    const lineItem = order.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem) {
        return;
    } else {
        const Product = mongoose.model('Product');
        const product = await Product.findById(productId);
        order.lineItems.push({ product });
    }
    return order.save();
};

// Removes an item for sale on the AllProductsPage once a buyer has checked out with the item
// orderSchema.methods.removeProductFromAllProductsPage = async function(productId) {
//     const order = this;
//     const lineItem = order.lineItems.find(lineItem => lineItem.product._id.equals(productId));
//     const Product = mongoose.model('Product');
//     const products = await Product.find({})
//     if (lineItem in products) {
//         const filteredProducts = products.filter()
//     }
// }

module.exports = mongoose.model('Order', orderSchema)