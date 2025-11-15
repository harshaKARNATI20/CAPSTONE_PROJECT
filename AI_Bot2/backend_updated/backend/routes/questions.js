const express = require('express');
const Question = require('../models/Question');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const questions = await Question.find().limit(10);
  res.json(questions);
});

module.exports = router;
