// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  date: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  shippingInfo: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema, 'orders');