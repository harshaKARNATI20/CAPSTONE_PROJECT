const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 👉 Step 1: Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 👉 Step 2: Google redirects back here after login
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/fail' }),
  (req, res) => {
    const payload = { id: req.user._id, roles: req.user.roles };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Redirect to frontend with token in URL
    const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}`;
    res.redirect(redirectUrl);
  }
);

// Optional: Failure route
router.get('/fail', (req, res) => res.status(401).json({ message: 'Google login failed' }));

module.exports = router;
