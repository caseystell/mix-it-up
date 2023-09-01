// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Product = require('./models/product');
const Category = require('./models/category');
const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, product, category, order;
let users, products, categories, orders;
