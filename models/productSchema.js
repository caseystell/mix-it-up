const Schema = require('mongoose').Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  img: { type: Buffer, contentType: String },
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
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
}, {
  timestamps: true
});

module.exports = productSchema;
