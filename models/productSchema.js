const Schema = require('mongoose').Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String },
  category: {
    type: String,
    required: true,
    enum: [
      'Automotive',
      'Baby',
      'Books',
      'Clothing, Shoes & Accessories',
      'Collectibles',
      'Electronics',
      'Furniture',
      'Health & Beauty',
      'Home Goods & Decor',
      'Home Improvement',
      'Kitchen',
      'Misc',
      'Music',
      'Office',
      'Outdoor & Garden',
      'Pets',
      'Seasonal',
      'Sporting Goods',
      'Toys & Games'
    ]
  },
  condition: { 
    type: String,
    required: true,
    enum: [
      'New',
      'Like New',
      'Good',
      'Fair',
      'Poor'
    ] 
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  purchased: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

module.exports = productSchema;
