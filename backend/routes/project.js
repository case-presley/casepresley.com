// backend/routes/project.js
const express = require('express');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost'); // Reusing BlogPost model for project-specific blog posts
const authMiddleware = require('../middleware/authMiddleware');
const sendNotificationEmail = require('../utils/mailer');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Create a new project (admin-only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();

        // Send notifications to project subscribers
        const subscriptions = await Subscription.find({ subscribedProjects: project._id });
        subscriptions.forEach(sub => {
            sendNotificationEmail(
                sub.email,
                `New Project: ${project.name}`,
                `We just launched a new project: "${project.name}". Visit casepresley.com to learn more!`
            );
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
});

// Create a new project-specific blog post (admin-only)
router.post('/:projectId/blog', authMiddleware, async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const projectBlogPost = new BlogPost({ ...req.body, projectId });
        await projectBlogPost.save();

        // Notify subscribers of this project about the new project blog post
        const subscriptions = await Subscription.find({ subscribedProjects: projectId });
        subscriptions.forEach(sub => {
            sendNotificationEmail(
                sub.email,
                `New Update in Project: ${project.name}`,
                `A new update has been posted in the project "${project.name}". Visit casepresley.com to read it!`
            );
        });

        res.status(201).json(projectBlogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project-specific blog post', error });
    }
});

// Read all projects (public)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
});

// Read a single project by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
});

// Update a project by ID (admin-only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
});

// Delete a project by ID (admin-only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
});

module.exports = router;
