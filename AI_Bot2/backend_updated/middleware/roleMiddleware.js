module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized - No user found' });
    const has = req.user.roles && req.user.roles.some(r => allowedRoles.includes(r));
    if (!has) return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
    next();
  };
};
