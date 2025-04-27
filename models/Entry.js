const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: String,
  start: String,
  end: String,
  cost: Number,
  mapsLink: String,
});

// Add schemas for accommodation, food, and misc arrays
const AccommodationSchema = new mongoose.Schema({
  name: String,
  cost: Number,
});
const FoodSchema = new mongoose.Schema({
  name: String,
  cost: Number,
});
const MiscSchema = new mongoose.Schema({
  name: String,
  cost: Number,
});

const DaySchema = new mongoose.Schema({
  activities: [ActivitySchema],
  accommodations: [AccommodationSchema],
  food: [FoodSchema],
  misc: [MiscSchema],
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
