// backend/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    languagesUsed: [String], // e.g., ["Java", "JavaScript", "Python"]
    media: [String], // Array of URLs for images or videos
    ctaLinks: { // Optional links for GitHub, contact, or donation
        github: { type: String },
        contact: { type: String },
        donate: { type: String },
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
