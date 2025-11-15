const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

// Users Management
router.get('/users', auth, role('admin'), adminController.getAllUsers);
router.put('/users/:id/block', auth, role('admin'), adminController.toggleUserBlock);

// Questions Management
router.get('/questions', auth, role('admin'), adminController.getAllQuestions);
router.post('/questions', auth, role('admin'), adminController.addQuestion);
router.put('/questions/:id', auth, role('admin'), adminController.updateQuestion);
router.delete('/questions/:id', auth, role('admin'), adminController.deleteQuestion);

// Global Stats
router.get('/stats', auth, role('admin'), adminController.getStats);

module.exports = router;
