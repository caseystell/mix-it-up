const mongoose = require('mongoose');
require('./category');
const productSchema = require('./productSchema');

module.exports = mongoose.model('Product', productSchema);