const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: String,
  start: String,
  end: String,
  cost: Number,
  mapsLink: String,
});

const DaySchema = new mongoose.Schema({
  activities: [ActivitySchema],
  accommodation: Number,
  food: Number,
  misc: Number,
});

const EntrySchema = new mongoose.Schema({
  challengeId: { type: String, required: true },
  name: { type: String, required: true }, // User name
  title: { type: String, required: true },
  reason: { type: String },
  days: [DaySchema],
  votes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      date: String,
      user: String,
    }
  ],
  winner: { type: Boolean, default: false },
});

module.exports = mongoose.model('Entry', EntrySchema);
