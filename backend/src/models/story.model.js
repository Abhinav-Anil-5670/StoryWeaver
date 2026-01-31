const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    // RELATIONSHIP: Links this story to the User who created it
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Story', StorySchema);