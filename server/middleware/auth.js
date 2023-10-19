// Create a new file named authMiddleware.js

const jwt = require('jsonwebtoken');
// const config = require('./config');

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
