const express = require('express');
const router = express.Router();
const Status = require('../models/Status');

// Get current status
router.get('/', async (req, res) => {
    try {
        const status = await Status.findOne().sort({ updatedAt: -1 });
        res.json(status);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create/Update status
router.post('/', async (req, res) => {
    const status = new Status(req.body);
    try {
        const newStatus = await status.save();
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
