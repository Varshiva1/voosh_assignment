const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: Number,
  subTotal: Number,
  phoneNumber: String,
});

module.exports = mongoose.model('Order', orderSchema);
