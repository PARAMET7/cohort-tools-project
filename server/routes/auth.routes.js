// server/routes/auth.routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { authenticateJWT } = require('../middleware/auth.middleware');
// server/routes/auth.routes.js

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /auth/signup
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// GET /auth/verify
router.get('/verify', authenticateJWT, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
