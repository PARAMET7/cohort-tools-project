const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Reference to the Student model
  // other fields...
});

module.exports = mongoose.model('Cohort', cohortSchema);
