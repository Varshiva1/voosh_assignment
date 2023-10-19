const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  password: String,
  login_by: String,
});

module.exports = mongoose.model('User', userSchema);
