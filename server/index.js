require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const scanRoutes = require('./routes/scan');
const aiAttackRoutes = require('./routes/aiAttack');
const reportRoutes = require('./routes/report');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

app.use('/api/scan', scanRoutes);
app.use('/api/ai', aiAttackRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
