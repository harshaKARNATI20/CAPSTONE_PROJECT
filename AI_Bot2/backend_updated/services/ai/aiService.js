const Question = require('../../models/Question');
const distil = require('./distilbertAdapter');
const vader = require('./vaderAdapter');

const WEIGHTS = { semantic: 0.6, keyword: 0.25, sentiment: 0.15 };

async function evaluateAnswer({ questionId, userAnswer }) {
  const q = await Question.findById(questionId).lean();
  if (!q) throw new Error('Question not found');

  const sample = q.sampleAnswer || '';
  const keywords = q.keywords || [];

  const embUser = await distil.getEmbedding(userAnswer);
  const embSample = await distil.getEmbedding(sample);
  const similarity = distil.cosine(embUser, embSample);
  const semanticScore = ((similarity + 1) / 2) * 10;

  let hits = 0; const missing = [];
  for (const key of keywords) {
    if (userAnswer.toLowerCase().includes(key.toLowerCase())) hits++; else missing.push(key);
  }
  const keywordScore = keywords.length ? (hits / keywords.length) * 10 : 5;

  const sentiment = vader.analyzeSentiment(userAnswer);
  const sentimentScore = vader.sentimentScore(sentiment.compound);

  const finalScore = (WEIGHTS.semantic * semanticScore + WEIGHTS.keyword * keywordScore + WEIGHTS.sentiment * sentimentScore).toFixed(2);

  return { finalScore, semanticScore, keywordScore, sentimentScore, missingKeywords: missing, sentiment, summary: `Score: ${finalScore}/10 | Missing: ${missing.join(', ') || 'None'}` };
}

module.exports = { evaluateAnswer };
