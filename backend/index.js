const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// DB Connection
const connectDB = require('./config/db');

// Create admin utility
const createAdminUser = require('./utils/createAdmin');

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Create admin user on startup
createAdminUser();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
