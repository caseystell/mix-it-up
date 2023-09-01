const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./productSchema');

const lineItemSchema = new Schema({
    product: productSchema
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

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        // query
        { user: userId, isPaid: false },
        // update - in the case the order (cart) is upserted
        { user: userId },
        // upsert option creates the doc if it doesn't exist!
        { upsert: true, new: true }
    );
};

orderSchema.methods.addProductToCart = async function (productId) {
    // 'this' keyword is bound to the cart (order doc)
    const cart = this;
    // Check if the product already exists in the cart
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    // Get the product from the "catalog"
    // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);
    // The qty of the new lineItem object being pushed in defaults to 1
    cart.lineItems.push({ product });
    // return the save() method's promise
    return cart.save();
};

// Instance method to set an product's qty in the cart
orderSchema.methods.setProductQty = function(productId, newQty) {
    // this keyword is bound to the cart (order doc)
    const cart = this;
    // Find the line product in the cart for the catalog product
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem && newQty <= 0) {
      // Calling deleteOne(), removes itself from the cart.lineItems array
      lineItem.deleteOne();
    } else if (lineItem) {
      // Set the new qty - positive value is assured thanks to prev if
      lineItem.qty = newQty;
    }
    // return the save() method's promise
    return cart.save();
};

module.exports = mongoose.model('Order', orderSchema)