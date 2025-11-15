const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ success: false, message: 'Invalid user or token' });
    if (user.isBlocked) return res.status(403).json({ success: false, message: 'User is blocked' });

    req.user = user; // ✅ Makes user available in controllers
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = auth;
