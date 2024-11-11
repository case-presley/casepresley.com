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

// Get all blog posts (public)
router.get('/', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error });
    }
});

// Get a single blog post by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog post', error });
    }
});

// Update a blog post by ID (admin-only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog post', error });
    }
});

// Delete a blog post by ID (admin-only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog post', error });
    }
});

module.exports = router;
