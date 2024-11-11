// backend/routes/blog.js
const express = require('express');
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Create a new blog post (admin-only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const blogPost = new BlogPost(req.body);
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error });
    }
});

// Read all blog posts (public)
router.get('/', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error });
    }
});

// Read a single blog post by ID (public)
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
