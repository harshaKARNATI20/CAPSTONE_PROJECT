const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const interviewController = require('../controllers/interviewController');

/**
 * @route   POST /api/interviews/start
 * @desc    Start a new interview session
 * @access  Private (Authenticated users only)
 * @body    { "domain": "FullStack.Web.MERN", "level": "Beginner", "round": "Technical" }
 */
router.post('/start', auth, interviewController.start);

/**
 * @route   POST /api/interviews/:id/answer
 * @desc    Submit an answer to a specific question
 * @access  Private
 * @body    { "qid": "<questionId>", "userAnswer": "Your answer text" }
 */
router.post('/:id/answer', auth, interviewController.answer);

/**
 * @route   POST /api/interviews/:id/finish
 * @desc    Complete interview, calculate final score, and generate report
 * @access  Private
 */
router.post('/:id/finish', auth, interviewController.finish);

/**
 * @route   GET /api/interviews/:id/report
 * @desc    Fetch the report for a specific interview
 * @access  Private
 */
router.get('/:id/report', auth, interviewController.getReport);

/**
 * @route   GET /api/interviews/me
 * @desc    Get all interviews for the logged-in user
 * @access  Private
 */
router.get('/me', auth, interviewController.listByUser);

module.exports = router;
