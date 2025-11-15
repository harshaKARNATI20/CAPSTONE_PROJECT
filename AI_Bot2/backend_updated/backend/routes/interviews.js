const express = require('express');
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * POST /api/interviews/start
 * Starts a new interview session for a user.
 * Body: { "domain": "FullStack.Web.MERN", "level": "Beginner", "round": "Technical" }
 */
router.post('/start', async (req, res) => {
  try {
    const { domain, level, round } = req.body;

    // 1️⃣ Validate input
    if (!domain || !level || !round) {
      return res.status(400).json({
        success: false,
        message: 'Domain, level, and round are required fields.'
      });
    }

    // 2️⃣ Fetch questions from DB
    const questions = await Question.find({ domain, level, round }).limit(5);

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions found for ${domain} (${round}, ${level})`
      });
    }

    // 3️⃣ Create interview record
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

    // 4️⃣ Respond with created interview
    res.status(201).json({
      success: true,
      message: 'Interview started successfully.',
      data: {
        interviewId: interview._id,
        questions: interview.questions,
        totalQuestions: questions.length
      }
    });

  } catch (error) {
    console.error('❌ Error in /start route:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
