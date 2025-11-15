const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  oauthProvider: String,
  oauthId: String,
  roles: { type: [String], default: ['user'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
