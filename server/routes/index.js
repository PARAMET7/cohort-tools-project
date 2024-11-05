// routes/index.js
const express = require('express');
const router = express.Router();

// Import sub-routes
const authRouter = require('./auth.routes');
const projectRouter = require('./project.routes');
const taskRouter = require('./task.routes');

// Base route for /api/
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API root!' });
});

// Attach sub-routes
router.use('/auth', authRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);

// Export the router
module.exports = router;
