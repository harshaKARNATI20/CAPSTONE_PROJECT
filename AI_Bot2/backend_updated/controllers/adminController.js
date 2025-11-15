const User = require('../models/User');
const Question = require('../models/Question');
const Interview = require('../models/Interview');
const Report = require('../models/Report');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ success: true, message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const q = new Question(req.body);
    await q.save();
    res.status(201).json({ success: true, data: q });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!q) return res.status(404).json({ success: false, message: 'Question not found' });
    res.json({ success: true, data: q });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Question.findByIdAndDelete(id);
    if (!q) return res.status(404).json({ success: false, message: 'Question not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalReports = await Report.countDocuments();
    res.json({ success: true, data: { totalUsers, totalQuestions, totalInterviews, totalReports } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
