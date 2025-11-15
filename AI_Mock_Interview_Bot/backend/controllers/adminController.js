const User = require('../models/User');
const Question = require('../models/Question');
const Interview = require('../models/Interview');
const Report = require('../models/Report');

// 👥 Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-__v');
  res.json({ success: true, data: users });
};

// 🚫 Block/unblock a user
exports.toggleUserBlock = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ success: true, message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
};

// ❓ CRUD for Question Bank
exports.getAllQuestions = async (req, res) => {
  const q = await Question.find().sort({ createdAt: -1 });
  res.json({ success: true, data: q });
};

exports.addQuestion = async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.status(201).json({ success: true, message: 'Question added successfully', data: question });
};

exports.updateQuestion = async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!q) return res.status(404).json({ success: false, message: 'Question not found' });
  res.json({ success: true, data: q });
};

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Question deleted successfully' });
};

// 📊 Global statistics for admin dashboard
exports.getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalQuestions = await Question.countDocuments();
  const totalInterviews = await Interview.countDocuments();
  const totalReports = await Report.countDocuments();
  res.json({ success: true, data: { totalUsers, totalQuestions, totalInterviews, totalReports } });
};
