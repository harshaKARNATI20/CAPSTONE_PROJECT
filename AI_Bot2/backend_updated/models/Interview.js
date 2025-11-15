const mongoose = require('mongoose');
const QASchema = new mongoose.Schema({
  qid: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  questionText: String,
  userAnswer: String,
  aiFeedback: Object,
  score: Number
});
const InterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  domain: String,
  round: String,
  level: String,
  questions: [QASchema],
  finalScore: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Interview', InterviewSchema);
