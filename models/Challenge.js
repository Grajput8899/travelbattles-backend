const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String },
  shortDesc: { type: String },
  deadline: { type: String },
  budget: { type: Number },
  status: { type: String }, // Ongoing, Upcoming, Closed
  images: { type: [String], default: [] }, // Array of image URLs
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
