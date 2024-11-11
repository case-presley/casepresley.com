// backend/routes/subscription.js
const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Subscribe to a blog or project
router.post('/subscribe', async (req, res) => {
    const { email, blogId, projectId } = req.body;

    try {
        let subscription = await Subscription.findOne({ email });

        if (!subscription) {
            subscription = new Subscription({ email });
        }

        if (blogId && !subscription.subscribedBlogs.includes(blogId)) {
            subscription.subscribedBlogs.push(blogId);
        }

        if (projectId && !subscription.subscribedProjects.includes(projectId)) {
            subscription.subscribedProjects.push(projectId);
        }

        await subscription.save();
        res.status(200).json({ message: 'Subscribed successfully', subscription });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing', error });
    }
});

// Unsubscribe from a blog or project
router.post('/unsubscribe', async (req, res) => {
    const { email, blogId, projectId } = req.body;

    try {
        const subscription = await Subscription.findOne({ email });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        if (blogId) {
            subscription.subscribedBlogs = subscription.subscribedBlogs.filter(id => id.toString() !== blogId);
        }

        if (projectId) {
            subscription.subscribedProjects = subscription.subscribedProjects.filter(id => id.toString() !== projectId);
        }

        await subscription.save();
        res.status(200).json({ message: 'Unsubscribed successfully', subscription });
    } catch (error) {
        res.status(500).json({ message: 'Error unsubscribing', error });
    }
});

module.exports = router;
