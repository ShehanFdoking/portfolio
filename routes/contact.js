const express = require('express');
const router = express.Router();

// Simple in-memory storage for contacts (replace with database in production)
let contacts = [];

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Store contact message
        const contactMessage = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            timestamp: new Date(),
            read: false
        };

        contacts.push(contactMessage);

        // Log to console (for now)
        console.log('📧 New Contact Message:');
        console.log(`From: ${name} (${email})`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log('---');

        res.status(200).json({
            message: 'Message received successfully! I will get back to you soon.',
            contactId: contactMessage.id
        });
    } catch (error) {
        console.error('Contact Error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// GET all contacts (for admin - optional)
router.get('/', (req, res) => {
    res.json(contacts);
});

// GET unread contacts count
router.get('/unread', (req, res) => {
    const unread = contacts.filter(c => !c.read).length;
    res.json({ unread, total: contacts.length });
});

// Mark contact as read
router.put('/:id/read', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (contact) {
        contact.read = true;
        res.json(contact);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

// Delete contact
router.delete('/:id', (req, res) => {
    contacts = contacts.filter(c => c.id !== parseInt(req.params.id));
    res.json({ message: 'Contact deleted' });
});

module.exports = router;

