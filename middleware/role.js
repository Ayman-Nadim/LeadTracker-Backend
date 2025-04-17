// middleware/role.js
const roleGuard = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};

// middleware/role.js
module.exports = { roleGuard }; // ✅ Comme tu as fait
