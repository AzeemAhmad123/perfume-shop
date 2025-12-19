const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('../backend/routes/productRoutes'));
app.use('/api/auth', require('../backend/routes/authRoutes'));
app.use('/api/cart', require('../backend/routes/cartRoutes'));
app.use('/api/orders', require('../backend/routes/orderRoutes'));
app.use('/api/users', require('../backend/routes/userRoutes'));
app.use('/api/payment', require('../backend/routes/paymentRoutes'));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gabbot';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => console.error('MongoDB connection error:', err));

// Export for Vercel serverless
module.exports = app;

