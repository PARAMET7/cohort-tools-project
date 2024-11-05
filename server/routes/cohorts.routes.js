const express = require('express');
const router = express.Router();
const Cohort = require('../models/Cohort.model'); // Adjust the path as necessary

// Get all cohorts
router.get('/', async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific cohort by ID and its students
router.get('/:id', async (req, res) => {
  try {
    const cohortId = req.params.id;
    const cohort = await Cohort.findById(cohortId);
    if (!cohort) return res.status(404).json({ message: 'Cohort not found' });

    // Populate students
    const students = await Student.find({ cohort: cohortId });

    res.status(200).json({
      cohort,
      students
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
