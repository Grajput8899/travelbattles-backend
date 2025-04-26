const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// GET all ads (public)
router.get('/', async (req, res) => {
  try {
    let ads = await Ad.find().sort({ createdAt: -1 });
    // If no ads in DB, return sample ads for testing
    if (!ads || ads.length === 0) {
      ads = [
        {
          imageUrl: 'https://via.placeholder.com/600x200?text=Ad+1',
          link: 'https://example.com/ad1',
          alt: 'Ad 1',
          _id: 'sample1',
          createdAt: new Date()
        },
        {
          imageUrl: 'https://via.placeholder.com/600x200?text=Ad+2',
          link: 'https://example.com/ad2',
          alt: 'Ad 2',
          _id: 'sample2',
          createdAt: new Date()
        }
      ];
    }
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new ad (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { imageUrl, link } = req.body;
    if (!imageUrl || !link) return res.status(400).json({ error: 'Image URL and link are required' });
    const ad = new Ad({ imageUrl, link });
    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete ad by ID (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
