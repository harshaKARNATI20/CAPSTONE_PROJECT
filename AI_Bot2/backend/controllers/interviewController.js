const Interview = require('../models/Interview');
const Question = require('../models/Question');
const Report = require('../models/Report');
const aiService = require('../services/ai/aiService');

/**
 * @desc  Start a new interview session
 * @route POST /api/interviews/start
 * @access Private
 */
exports.start = async (req, res) => {
  try {
    const { domain, level, round } = req.body;

    if (!domain || !level || !round) {
      return res.status(400).json({
        success: false,
        message: 'Domain, level, and round are required.'
      });
    }

    const questions = await Question.find({ domain, level, round }).limit(5);
    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: `No questions found for ${domain} (${round}, ${level}).`
      });
    }

    const interview = await Interview.create({
      userId: req.user._id,
      domain,
      level,
      round,
      questions: questions.map(q => ({
        qid: q._id,
        questionText: q.questionText
      }))
    });

    res.status(201).json({
      success: true,
      message: 'Interview started successfully.',
      data: {
        interviewId: interview._id,
        questions: interview.questions,
        totalQuestions: questions.length
      }
    });
  } catch (err) {
    console.error('Error in start:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc  Submit answer for a question (AI evaluated)
 * @route POST /api/interviews/:id/answer
 * @access Private
 */
exports.answer = async (req, res) => {
  try {
    const { id } = req.params; // interview ID
    const { qid, userAnswer } = req.body;

    if (!qid || !userAnswer) {
      return res.status(400).json({ success: false, message: 'qid and userAnswer are required.' });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found.' });

    // Find question in the interview
    const entryIndex = interview.questions.findIndex(q => String(q.qid) === String(qid));
    if (entryIndex === -1) {
      return res.status(400).json({ success: false, message: 'Question not part of this interview.' });
    }

    // AI evaluation
    const aiResult = await aiService.evaluateAnswer({ questionId: qid, userAnswer });

    // Save AI feedback
    interview.questions[entryIndex].userAnswer = userAnswer;
    interview.questions[entryIndex].aiFeedback = aiResult;
    interview.questions[entryIndex].score = aiResult.finalScore;
    await interview.save();

    res.json({
      success: true,
      message: 'Answer evaluated and saved successfully.',
      data: aiResult
    });
  } catch (err) {
    console.error('Error in answer:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc  Finish interview and generate report
 * @route POST /api/interviews/:id/finish
 * @access Private
 */
exports.finish = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found.' });

    // Compute final score
    const scores = interview.questions.map(q => q.score || 0);
    const finalScore = scores.length
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
      : 0;

    interview.finalScore = finalScore;
    await interview.save();

    // Generate report
    const report = new Report({
      interviewId: interview._id,
      userId: interview.userId,
      summary: `Interview completed with an overall score of ${finalScore}/10.`,
      scoresByTopic: {},
      sentimentSummary: 'Neutral', // You can later calculate avg sentiment here
    });
    await report.save();

    res.json({
      success: true,
      message: 'Interview finished and report generated.',
      data: { finalScore, reportId: report._id }
    });
  } catch (err) {
    console.error('Error in finish:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc  Get report for a specific interview
 * @route GET /api/interviews/:id/report
 * @access Private
 */
exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({ interviewId: id });
    if (!report) return res.status(404).json({ success: false, message: 'Report not found.' });
    res.json({ success: true, data: report });
  } catch (err) {
    console.error('Error in getReport:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc  List all interviews for logged-in user
 * @route GET /api/interviews/me
 * @access Private
 */
exports.listByUser = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: interviews });
  } catch (err) {
    console.error('Error in listByUser:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
