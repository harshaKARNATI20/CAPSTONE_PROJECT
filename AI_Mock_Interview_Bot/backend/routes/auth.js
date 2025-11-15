const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Common JWT generator
 */
function generateTokenAndRedirect(user, res) {
  const payload = { id: user._id, roles: user.roles };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}`;
  res.redirect(redirectUrl);
}

/* --------------------- GOOGLE AUTH --------------------- */
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

auth.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/fail' }),
  (req, res) => generateTokenAndRedirect(req.user, res)
);

/* --------------------- GITHUB AUTH --------------------- */
auth.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

auth.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth/fail' }),
  (req, res) => generateTokenAndRedirect(req.user, res)
);

/* --------------------- COMMON ROUTES --------------------- */
auth.get('/fail', (req, res) => res.status(401).json({ success: false, message: 'OAuth failed' }));

auth.get('/me', authMiddleware, (req, res) => res.json({ success: true, user: req.user }));

module.exports = auth;
