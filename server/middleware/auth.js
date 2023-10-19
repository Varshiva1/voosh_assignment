// Create a new file named authMiddleware.js

const jwt = require('jsonwebtoken');
// const config = require('./config');
const JWT_SECRET='voosh'
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(400).json({ message: 'Access denied',status:'400' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
