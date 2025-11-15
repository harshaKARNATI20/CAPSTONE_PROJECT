const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  domain: String,
  round: String,
  topic: String,
  level: String,
  questionText: String,
  sampleAnswer: String,
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Question', QuestionSchema);
