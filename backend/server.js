require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Database Connection (We will build this file next)
const connectDB = require('./src/db/db');

// Import Routes (We will build these later)
const authRoutes = require('./src/routes/auth.routes');
const storyRoutes = require('./src/routes/story.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Connect to Database
connectDB();

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Routes
app.use('/api/auth', authRoutes); // Authentication (Login/Register)
app.use('/api', storyRoutes);     // Story Features (Protected)

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});