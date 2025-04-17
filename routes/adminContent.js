const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Get all content blocks
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new content block
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { key, value } = req.body;
    const existing = await Content.findOne({ key });
    if (existing) return res.status(400).json({ error: 'Key already exists' });
    const content = new Content({ key, value });
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit content block by key
router.put('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Content.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Content block not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete content block by key
router.delete('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await Content.findOneAndDelete({ key: req.params.key });
    if (!deleted) return res.status(404).json({ error: 'Content block not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
