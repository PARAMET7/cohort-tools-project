// server/app.js
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

// Use the auth routes

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MongoDB Connection Setup
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cohort-tools-api";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const studentRoutes = require('./routes/students.routes');
const cohortRoutes = require('./routes/cohorts.routes');
const userRoutes = require('./routes/users.routes'); // Import user routes

// Use student, cohort, and user routes
app.use("/api/students", studentRoutes);
app.use("/api/cohorts", cohortRoutes);
app.use("/api/users", userRoutes); // Add user routes

// Optional route to check the root
app.get("/", (req, res) => {
  res.send("Welcome to the Cohort Tools API!");
});
app.use("/auth", authRoutes);
// Start server
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
