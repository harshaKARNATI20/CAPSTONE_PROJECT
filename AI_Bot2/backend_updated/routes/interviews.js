const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/interviewController');

router.post('/start', auth, controller.start);
router.post('/:id/answer', auth, controller.answer);
router.post('/:id/finish', auth, controller.finish);
router.get('/:id/report', auth, controller.getReport);
router.get('/me', auth, controller.listByUser);

module.exports = router;
