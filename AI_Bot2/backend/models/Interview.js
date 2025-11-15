const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  qid: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  questionText: String,
  userAnswer: String,
  score: Number,
});

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  domain: String,
  round: String,
  level: String,
  questions: [qaSchema],
  finalScore: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Interview', interviewSchema);
