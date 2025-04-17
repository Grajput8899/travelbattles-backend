require('dotenv').config();
const mongoose = require('mongoose');
const Challenge = require('./models/Challenge');
const Entry = require('./models/Entry');

// NEW demo data with matching IDs
const demoChallenges = [
  {
    id: 'goa10k',
    title: 'Goa 10K Budget Challenge',
    desc: 'Plan a Goa trip under 10,000 INR! Show your best itinerary and win.',
    shortDesc: 'Goa on a budget',
    deadline: '2025-07-01',
    budget: 10000,
    status: 'Ongoing',
  },
  {
    id: 'himalaya5d',
    title: 'Himalayan 5-Day Trek',
    desc: 'Design a 5-day trek itinerary in the Himalayas for adventure seekers.',
    shortDesc: '5-day Himalayan trek',
    deadline: '2025-08-01',
    budget: 20000,
    status: 'Upcoming',
  },
];

const demoEntries = [
  {
    challengeId: 'goa10k',
    name: 'Govind',
    title: 'Budget Goa Fun',
    reason: 'Max fun, minimum spend!',
    days: [
      {
        activities: [
          { name: 'Arrive & Relax', start: '9:00 AM', end: '11:00 AM', cost: 0, mapsLink: '' },
          { name: 'Baga Beach', start: '12:00 PM', end: '4:00 PM', cost: 200, mapsLink: 'https://goo.gl/maps/xyz123' },
        ],
        accommodation: 1500,
        food: 300,
        misc: 100,
      },
      {
        activities: [
          { name: 'Fort Aguada', start: '10:00 AM', end: '1:00 PM', cost: 100, mapsLink: 'https://goo.gl/maps/abc456' },
        ],
        accommodation: 1500,
        food: 350,
        misc: 120,
      },
    ],
    votes: 2,
    comments: [
      { text: 'Great itinerary!', date: '2025-04-17T10:00:00', user: 'Sanjana' },
    ],
  },
  {
    challengeId: 'goa10k',
    name: 'Sanjana',
    title: 'Goa Explorer',
    reason: 'See all the best beaches!',
    days: [
      {
        activities: [
          { name: 'Calangute Beach', start: '10:00 AM', end: '2:00 PM', cost: 150, mapsLink: 'https://goo.gl/maps/calangute' },
          { name: 'Candolim Fort', start: '3:00 PM', end: '5:00 PM', cost: 50, mapsLink: '' },
        ],
        accommodation: 1200,
        food: 250,
        misc: 80,
      },
    ],
    votes: 1,
    comments: [],
  },
  {
    challengeId: 'himalaya5d',
    name: 'Amit',
    title: 'Himalayan Adventure',
    reason: 'Love the mountains!',
    days: [
      {
        activities: [
          { name: 'Start Trek', start: '7:00 AM', end: '5:00 PM', cost: 500, mapsLink: '' },
        ],
        accommodation: 2000,
        food: 500,
        misc: 200,
      },
    ],
    votes: 1,
    comments: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Challenge.deleteMany();
    await Entry.deleteMany();
    await Challenge.insertMany(demoChallenges);
    await Entry.insertMany(demoEntries);
    console.log('Demo data seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
