const express = require('express');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
    try {
        console.log('=== Login attempt ===');
        console.log('Request body:', req.body);

        const { email, password } = req.body;

        console.log('Email:', email);
        console.log('Password:', password);

        // Simple authentication
        if (email === 'fernandoshehan313@gmail.com' && password === 'shehan123') {
            console.log('✅ Login successful!');
            return res.json({
                success: true,
                message: 'Login successful',
                user: { email, name: 'Shehan' }
            });
        } else {
            console.log('❌ Login failed - Invalid credentials');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (err) {
        console.error('❌ Login error:', err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});

// Verify token
router.get('/verify', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
