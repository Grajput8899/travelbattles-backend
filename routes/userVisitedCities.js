const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Save or update user's visited cities
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Visited cities request body:', req.body);
    console.log('Decoded user from auth:', req.user);
    // Use either _id or id from req.user
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) {
      console.error('No userId found in req.user');
      return res.status(401).json({ error: 'Unauthorized: No userId' });
    }
    const { visitedCities } = req.body;
    if (!Array.isArray(visitedCities)) {
      console.error('visitedCities is not an array:', visitedCities);
      return res.status(400).json({ error: 'visitedCities must be an array' });
    }
    const updated = await User.findByIdAndUpdate(
      userId,
      { visitedCities },
      { new: true }
    );
    if (!updated) {
      console.error('No user found with id:', userId);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, visitedCities: updated.visitedCities });
  } catch (err) {
    console.error('Error in /api/user/visited-cities:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Get user's visited cities
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json({ visitedCities: user.visitedCities || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
