const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const authMiddleware = require('../middleware/auth');

// GET all entries for a challenge
router.get('/:challengeId', async (req, res) => {
  try {
    const entries = await Entry.find({ challengeId: req.params.challengeId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a like (increment vote count)
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a comment
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { text, user } = req.body;
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text, user, date: new Date().toISOString() } } },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
