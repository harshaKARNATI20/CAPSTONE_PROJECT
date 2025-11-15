const Question = require('../models/Question');

exports.list = async (req, res, next) => {
  try {
    const filter = {};
    const { domain, level, round, topic } = req.query;
    if (domain) filter.domain = domain;
    if (level) filter.level = level;
    if (round) filter.round = round;
    if (topic) filter.topic = topic;
    const q = await Question.find(filter).limit(200);
    res.json(q);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.user.roles.includes('admin')) return res.status(403).json({ message: 'Admin only' });
    const question = new Question({ ...req.body, createdBy: req.user._id });
    await question.save();
    res.json(question);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(q);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
};
