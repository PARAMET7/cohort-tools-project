const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' }, // Reference to the Cohort model
  // other fields...
});

module.exports = mongoose.model('Student', studentSchema);

