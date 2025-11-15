const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  summary: String,
  scoresByTopic: Object,
  sentimentSummary: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Report', ReportSchema);
