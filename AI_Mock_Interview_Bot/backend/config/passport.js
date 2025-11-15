const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// ✅ Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          oauthProvider: 'google',
          oauthId: profile.id,
        });
        if (existingUser) return done(null, existingUser);

        const email = profile.emails?.[0]?.value || '';
        const newUser = await User.create({
          name: profile.displayName,
          email,
          oauthProvider: 'google',
          oauthId: profile.id,
          roles: ['user'],
        });

        return done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// ✅ GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          oauthProvider: 'github',
          oauthId: profile.id,
        });
        if (existingUser) return done(null, existingUser);

        const email = profile.emails?.[0]?.value || '';
        const newUser = await User.create({
          name: profile.displayName || profile.username,
          email,
          oauthProvider: 'github',
          oauthId: profile.id,
          roles: ['user'],
        });

        return done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
