const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const Challenge = require('../models/Challenge');
const { v4: uuidv4 } = require('uuid');

// Get all challenges
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new challenge (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    if (!req.body.id) {
      req.body.id = uuidv4();
    }
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit a challenge
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Challenge.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { id: req.params.id }] },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Edit challenge error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a challenge
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Challenge.findOneAndDelete({ $or: [{ _id: req.params.id }, { id: req.params.id }] });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete challenge error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
