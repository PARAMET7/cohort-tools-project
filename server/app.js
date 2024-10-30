const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 5006;
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// Import the JSON data
const cohortsData = require('./cohorts.json'); // Adjust the path if necessary
const studentsData = require('./students.json'); // Adjust the path if necessary

const mongoURI = "mongodb://localhost:27017/cohort-tools-api";
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require('cors');
app.use(cors());

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// GET /api/cohorts - Returns all cohorts as JSON
app.get("/api/cohorts", (req, res) => {
  res.json(cohortsData);
});

// GET /api/students - Returns all students as JSON
app.get("/api/students", (req, res) => {
  res.json(studentsData);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
