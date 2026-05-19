require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const scanRoutes = require('./routes/scan');
const aiAttackRoutes = require('./routes/aiAttack');
const reportRoutes = require('./routes/report');

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});

const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15, // limit each IP to 15 AI requests per 10 minutes
  message: { success: false, error: 'AI API quota exceeded for this IP. Please wait a few minutes before simulating again.' }
});

app.use('/api', limiter);
app.use('/api/ai', aiLimiter);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

app.use('/api/scan', scanRoutes);
app.use('/api/ai', aiAttackRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (!process.env.MONGO_URI) {
  console.warn('================================================================');
  console.warn('WARNING: MONGO_URI environment variable is not defined.');
  console.warn('Database features will be unavailable. Please add MONGO_URI');
  console.warn('in your Render Service Environment Variables to connect.');
  console.warn('================================================================');
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas successfully.');
    })
    .catch(err => {
      console.error('MongoDB connection error during runtime:', err);
    });
}
