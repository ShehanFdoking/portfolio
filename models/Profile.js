const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    email: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
