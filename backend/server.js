// Import the tools we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import our routes
const todoRoutes = require('./routes/todos');

// Create our app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((error) => console.log('❌ MongoDB connection error:', error));

// Routes
// This means: any request to /api/todos will be handled by todoRoutes
app.use('/api/todos', todoRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello! The backend is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});