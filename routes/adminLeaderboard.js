const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const Entry = require('../models/Entry');

// Set a leaderboard winner for a challenge
router.put('/winner/:challengeId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { entryId } = req.body;
    // Set all entries for this challenge to not winner (if you add a winner field)
    await Entry.updateMany({ challengeId: req.params.challengeId }, { $unset: { winner: '' } });
    // Set the selected entry as winner
    await Entry.findByIdAndUpdate(entryId, { winner: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
