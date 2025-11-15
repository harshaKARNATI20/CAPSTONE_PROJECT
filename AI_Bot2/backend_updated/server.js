require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const connectDB = require('./config/db');

// load passport config if exists
try { require('./config/passport'); } catch (e) { console.warn('No passport config found'); }

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());

// routes
app.use('/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/admin', require('./routes/admin'));

// health
app.get('/health', (req, res) => res.json({ status: 'OK', time: new Date().toISOString() }));

// error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
