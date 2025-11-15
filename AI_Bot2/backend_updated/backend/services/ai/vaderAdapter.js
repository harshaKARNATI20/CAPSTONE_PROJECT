// services/ai/vaderAdapter.js
const vader = require('vader-sentiment');

function analyzeSentiment(text) {
  const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  return result; // {neg, neu, pos, compound}
}

function sentimentScore(compound) {
  // Convert compound (-1 to 1) → score (0 to 10)
  return Math.round(((compound + 1) / 2) * 10 * 10) / 10;
}

module.exports = { analyzeSentiment, sentimentScore };
