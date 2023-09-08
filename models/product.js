const mongoose = require('mongoose');
require('./user');
const productSchema = require('./productSchema');

module.exports = mongoose.model('Product', productSchema);