const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true },
  oauthProvider: String,
  oauthId: String,
  isBlocked: { type: Boolean, default: false },
  roles: { type: [String], default: ['user'] },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
