// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import the auth routes
const blogRoutes = require('./routes/blog');
const projectRoutes = require('./routes/project');
const subscriptionRoutes = require('./routes/subscription');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', authRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
