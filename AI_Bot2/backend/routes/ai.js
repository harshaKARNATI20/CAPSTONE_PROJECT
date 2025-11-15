const express = require('express');
const aiService = require('../services/ai/aiService');
const router = express.Router();

/**
 * POST /api/ai/evaluate
 * Evaluates a user's answer using DistilBERT + VADER + keyword logic
 * Body:
 *   { "questionId": "<id>", "userAnswer": "your answer here" }
 */
router.post('/evaluate', async (req, res) => {
  try {
    if (!req.is('application/json')) {
      return res.status(415).json({ message: 'Content-Type must be application/json' });
    }

    const { questionId, userAnswer } = req.body;

    if (!questionId || !userAnswer) {
      return res.status(400).json({ message: 'questionId and userAnswer are required.' });
    }

    const result = await aiService.evaluateAnswer({ questionId, userAnswer });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('AI evaluation failed:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/ai/sentiment
 * Simple VADER-only test route (optional)
 */
router.post('/sentiment', (req, res) => {
  try {
    const vader = require('vader-sentiment');
    const { text } = req.body;
    const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(text || '');
    res.json({ success: true, data: { sentiment } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
