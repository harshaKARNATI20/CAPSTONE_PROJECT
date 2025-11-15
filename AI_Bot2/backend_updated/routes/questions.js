const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/authMiddleware');

// GET list (filterable)
router.get('/', auth, async (req, res) => {
  const { domain, level, round, topic } = req.query;
  const filter = {};
  if (domain) filter.domain = domain;
  if (level) filter.level = level;
  if (round) filter.round = round;
  if (topic) filter.topic = topic;
  const q = await Question.find(filter).limit(200);
  res.json({ success: true, data: q });
});

module.exports = router;
