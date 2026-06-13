const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Status', StatusSchema);
