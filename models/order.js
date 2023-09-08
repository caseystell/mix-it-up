const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./productSchema');

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
    return this.lineItems.reduce((total, product) => total + product.price, 0);
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
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem && newQty <= 0) {
      lineItem.deleteOne();
    } else if (lineItem) {
      lineItem.qty = 1;
    }
    return cart.save();
};

module.exports = mongoose.model('Order', orderSchema)