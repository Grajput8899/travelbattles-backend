require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const challengeRoutes = require('./routes/challenges');
const entryRoutes = require('./routes/entries');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const adminEntryRoutes = require('./routes/adminEntries');
const adminChallengeRoutes = require('./routes/adminChallenges');
const adminUserRoutes = require('./routes/adminUsers');
const adminLeaderboardRoutes = require('./routes/adminLeaderboard');
const adminContentRoutes = require('./routes/adminContent');
const userVisitedCitiesRouter = require('./routes/userVisitedCities');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/challenges', challengeRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/entries', adminEntryRoutes);
app.use('/api/admin/challenges', adminChallengeRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/leaderboard', adminLeaderboardRoutes);
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/user/visited-cities', userVisitedCitiesRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
