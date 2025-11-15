const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const aiService = require('../services/ai/aiService');

router.post('/evaluate', auth, async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    if (!questionId || !userAnswer) return res.status(400).json({ success:false, message: 'questionId and userAnswer required' });
    const result = await aiService.evaluateAnswer({ questionId, userAnswer });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('AI eval error', err);
    res.status(500).json({ success:false, message: err.message });
  }
});

router.post('/sentiment', auth, (req, res) => {
  const vader = require('vader-sentiment');
  const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(req.body.text || '');
  res.json({ success: true, data: sentiment });
});

module.exports = router;
