const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

auth.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/fail' }),
  (req, res) => {
    const payload = { id: req.user._id, roles: req.user.roles };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    const redirectUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/oauth-success?token=${token}`;
    res.redirect(redirectUrl);
  }
);

auth.get('/fail', (req, res) => res.status(401).json({ success: false, message: 'OAuth failed' }));

// optional: get current user
auth.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = auth;
