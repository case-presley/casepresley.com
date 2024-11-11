// backend/routes/blog.js
const express = require('express');
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/authMiddleware');
const sendNotificationEmail = require('../utils/mailer');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Create a new general blog post (admin-only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const blogPost = new BlogPost(req.body);
        await blogPost.save();

        // Send notifications to general blog subscribers
        const subscriptions = await Subscription.find({ subscribedBlogs: 'general' });
        subscriptions.forEach(sub => {
            sendNotificationEmail(
                sub.email,
                `New Blog Post: ${blogPost.title}`,
                `Check out our latest blog post titled "${blogPost.title}". Visit casepresley.com for more details!`
            );
        });

        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error });
    }
});

module.exports = router;
