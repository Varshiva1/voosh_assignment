const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  password: String,
  googleId: String,
});

module.exports = mongoose.model('User', userSchema);
