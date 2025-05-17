const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');

// Get all samples
router.get('/', async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a sample
router.post('/', async (req, res) => {
  const sample = new Sample({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newSample = await sample.save();
    res.status(201).json(newSample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;