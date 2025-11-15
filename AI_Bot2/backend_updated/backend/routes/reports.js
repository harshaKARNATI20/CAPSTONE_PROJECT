const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');

// GET /api/reports/analytics
router.get('/analytics', auth, reportController.getAnalytics);

module.exports = router;
