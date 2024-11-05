// server/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use your JWT secret here

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt; // Assuming you're using cookies to store the JWT

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user information to the request
    next();
  });
};

module.exports = { authenticateJWT };
