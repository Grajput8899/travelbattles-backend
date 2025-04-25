const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ad', AdSchema);
