// backend/models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedBlogs: [{ type: mongoose.Schema.Types.Mixed }], // Allows "general" or specific ObjectId references
    subscribedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // Array of project IDs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
