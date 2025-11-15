const Interview = require('../models/Interview');
const Question = require('../models/Question');
const Report = require('../models/Report');
const aiService = require('../services/ai/aiService');

exports.start = async (req, res) => {
  try {
    const { domain, level, round } = req.body;
    if (!domain || !level || !round) return res.status(400).json({ success:false, message:'domain, level, round required' });
    const questions = await Question.find({ domain, level, round }).limit(5);
    if (!questions.length) return res.status(404).json({ success:false, message:'No questions found' });
    const interview = await Interview.create({ userId: req.user._id, domain, level, round, questions: questions.map(q=>({ qid: q._id, questionText: q.questionText })) });
    res.status(201).json({ success:true, data: { interviewId: interview._id, questions: interview.questions } });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message: err.message }); }
};

exports.answer = async (req, res) => {
  try {
    const { id } = req.params;
    const { qid, userAnswer } = req.body;
    if (!qid || !userAnswer) return res.status(400).json({ success:false, message:'qid and userAnswer required' });
    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ success:false, message:'Interview not found' });
    const idx = interview.questions.findIndex(q=>String(q.qid)===String(qid));
    if (idx===-1) return res.status(400).json({ success:false, message: 'Question not part of interview' });
    const aiResult = await aiService.evaluateAnswer({ questionId: qid, userAnswer });
    interview.questions[idx].userAnswer = userAnswer;
    interview.questions[idx].aiFeedback = aiResult;
    interview.questions[idx].score = aiResult.finalScore;
    await interview.save();
    res.json({ success:true, data: aiResult });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message: err.message }); }
};

exports.finish = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ success:false, message:'Interview not found' });
    const scores = interview.questions.map(q=>q.score||0);
    const finalScore = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(2) : 0;
    interview.finalScore = finalScore;
    await interview.save();
    const report = await Report.create({ interviewId: interview._id, userId: interview.userId, summary: `Score: ${finalScore}`, scoresByTopic: {}, sentimentSummary: 'Neutral' });
    res.json({ success:true, data: { finalScore, reportId: report._id }});
  } catch (err) { console.error(err); res.status(500).json({ success:false, message: err.message }); }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({ interviewId: id });
    if (!report) return res.status(404).json({ success:false, message:'Report not found' });
    res.json({ success:true, data: report });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message: err.message }); }
};

exports.listByUser = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id }).sort({ createdAt:-1 });
    res.json({ success:true, data: interviews });
  } catch (err) { console.error(err); res.status(500).json({ success:false, message: err.message }); }
};
