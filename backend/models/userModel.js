const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastLogin: { type: Date }, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
