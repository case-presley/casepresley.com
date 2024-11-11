// backend/models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: [String],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
