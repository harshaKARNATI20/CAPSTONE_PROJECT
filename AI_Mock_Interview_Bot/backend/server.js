// ----------------------------------------------------------
// AI Mock Interview Bot Backend - Main Server File
// ----------------------------------------------------------

require('dotenv').config();                  // Load environment variables

const express = require('express');          // Express framework
const cors = require('cors');                // Enable Cross-Origin Resource Sharing
const cookieParser = require('cookie-parser');
const passport = require('passport');        // For Google OAuth
// const morgan = require('morgan');            // For request logging
const path = require('path');

const connectDB = require('./config/db');    // MongoDB connection function
require('./config/passport');                // Load Google OAuth setup

// ----------------------------------------------------------
//  Import Routes
// ----------------------------------------------------------
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const interviewRoutes = require('./routes/interviews');
const aiRoutes = require('./routes/ai');
const reportRoutes = require('./routes/reports');
const errorHandler = require('./middleware/errorHandler');

// ----------------------------------------------------------
//  Initialize App
// ----------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------------
//  Connect Database
// ----------------------------------------------------------
connectDB();

// ----------------------------------------------------------
//  Middleware Setup
// ----------------------------------------------------------

// CORS setup (update CLIENT_URL in .env for production)
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// JSON + URL parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Cookies + logging
app.use(cookieParser());
// app.use(morgan('dev')); // Logs HTTP requests in console

// Initialize Passport (for Google OAuth)
app.use(passport.initialize());

// ----------------------------------------------------------
//  API Routes
// ----------------------------------------------------------

// Authentication (Google OAuth + JWT)
app.use('/auth', authRoutes);

// Question management routes
app.use('/api/questions', questionRoutes);

// Interview flow routes (start, answer, finish, report)
app.use('/api/interviews', interviewRoutes);

// AI evaluation & sentiment analysis routes
app.use('/api/ai', aiRoutes);

// Analytics & reports routes
app.use('/api/reports', reportRoutes);

// ----------------------------------------------------------
//  Health Check Endpoint
// ----------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy 🚀',
    time: new Date().toISOString(),
  });
});

// ----------------------------------------------------------
//  Global Error Handler Middleware
// ----------------------------------------------------------
app.use(errorHandler);

// ----------------------------------------------------------
//  Start Server
// ----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ MongoDB connected successfully`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ----------------------------------------------------------
//  Optional: Graceful Shutdown (recommended for production)
// ----------------------------------------------------------
process.on('SIGINT', () => {
  console.log('\n🧹 Gracefully shutting down server...');
  process.exit(0);
});
