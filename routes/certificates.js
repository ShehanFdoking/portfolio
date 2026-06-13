const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');

// Get all certificates
router.get('/', async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ date: -1 });
        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create certificate
router.post('/', async (req, res) => {
    const certificate = new Certificate(req.body);
    try {
        const newCertificate = await certificate.save();
        res.status(201).json(newCertificate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update certificate
router.put('/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.json(certificate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete certificate
router.delete('/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
        res.json({ message: 'Certificate deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
