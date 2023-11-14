require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const User = require("./models/userModel");
const Job = require("./models/jobModel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Username already exists.");
    } else {
      console.error(error);
      res.status(500).send("An error occurred during registration.");
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).send(token);
});

app.post("/api/jobEntries", async (req, res) => {
  try {
    const jobData = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      employmentType: req.body.employmentType,
      postedDate: req.body.postedDate,
      applyLink: req.body.applyLink,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while posting the job advertisement.");
  }
});

app.get("/api/jobEntries", async (req, res) => {
  try {
    const jobEntries = await Job.find();
    res.json(jobEntries);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
