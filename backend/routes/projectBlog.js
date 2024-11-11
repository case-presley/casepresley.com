// backend/routes/projectBlog.js
const express = require('express');
const ProjectBlogPost = require('../models/ProjectBlogPost'); // Assuming a separate model for project blog posts
const authMiddleware = require('../middleware/authMiddleware');
const sendNotificationEmail = require('../utils/mailer');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Create a new project-specific blog post (admin-only)
router.post('/:projectId', authMiddleware, async (req, res) => {
    try {
        const projectBlogPost = new ProjectBlogPost({
            ...req.body,
            projectId: req.params.projectId
        });
        await projectBlogPost.save();

        // Send notifications to project-specific blog subscribers
        const subscriptions = await Subscription.find({ subscribedProjects: req.params.projectId });
        subscriptions.forEach(sub => {
            sendNotificationEmail(
                sub.email,
                `New Project Blog Post: ${projectBlogPost.title}`,
                `Check out the latest update on our project "${projectBlogPost.title}". Visit casepresley.com for more details!`
            );
        });

        res.status(201).json(projectBlogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project-specific blog post', error });
    }
});

module.exports = router;
