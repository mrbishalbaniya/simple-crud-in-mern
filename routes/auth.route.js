const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || 'your_secret_key', 
            { expiresIn: '1h' }
        );

        // This line was likely outside the closing brace in your error
        res.status(200).json({ 
            message: "Login successful!", 
            token: token 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;