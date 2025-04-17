const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) return res.status(401).send('Access denied');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Permission denied');
    }
    next();
  };
};

module.exports = { authenticate, authorize };

