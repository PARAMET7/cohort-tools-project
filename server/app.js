const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Student = require("./models/Students.model");
const Cohort = require("./models/Cohort.model");

const PORT = process.env.PORT || 5006;

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cohort-tools-api";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Cohort Routes

// POST /api/cohorts - Creates a new cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const cohort = new Cohort(req.body);
    await cohort.save();
    res.status(201).json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/cohorts - Retrieves all cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find().populate('students'); // Assuming Cohort has a reference to students
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by ID
app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId).populate('students');
    if (!cohort) return res.status(404).json({ error: "Cohort not found" });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cohorts/:cohortId - Updates a specific cohort by ID
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!cohort) return res.status(404).json({ error: "Cohort not found" });
    res.json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by ID
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student Routes

// POST /api/students - Creates a new student
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/students - Retrieves all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate('cohort');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/cohort/:cohortId - Retrieves all students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate('cohort');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/:studentId - Retrieves a specific student by ID
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('cohort');
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:studentId - Updates a specific student by ID
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/students/:studentId - Deletes a specific student by ID
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
