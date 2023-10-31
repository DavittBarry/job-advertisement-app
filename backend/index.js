require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const User = require('./models/userModel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

const jobEntries = [
  {title: 'Software Engineer', company: 'Company A', description: 'Job description here'},
  {title: 'Data Analyst', company: 'Company B', description: 'Analyze data and create reports'},
  {title: 'UI/UX Designer', company: 'Company C', description: 'Design user interfaces and experiences'},
];

app.get('/api/jobEntries', (req, res) => {
  res.json(jobEntries);
});

const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
