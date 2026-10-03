// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 20 },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 1 },
  image: { type: String, required: true },
  description: { type: String },
  specifications: {
    brand: { type: String, default: 'ApexBrand' },
    warranty: { type: String, default: '1 Year' },
    origin: { type: String, default: 'India' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema, 'products');