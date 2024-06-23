const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB has been connected");
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const affirmSchema = new mongoose.Schema({
  affirmation: String,
  date: { type: Date, default: Date.now }
});

const Affirmation = mongoose.model('feliProj', affirmSchema, 'feliAffirm');

// Example route to add a new affirmation
app.post('/affirmations', async (req, res) => {
  const newAffirmation = new Affirmation(req.body);
  try {
    const savedAffirmation = await newAffirmation.save();
    res.status(201).json(savedAffirmation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Example route to get all affirmations
app.get('/affirmations', async (req, res) => {
  try {
    const affirmations = await Affirmation.find();
    res.json(affirmations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
