const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Helper function to generate Token
const generateToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create user (Password hashing happens in user.model.js)
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully!",
            // Optional: You can send a token here too so they are logged in immediately
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });

        // 2. Check user exists and password matches
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. Verify JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("CRITICAL: JWT_SECRET is missing in .env file");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // 4. Generate Token
        const token = generateToken(user._id);

        // 5. Respond with success
        res.status(200).json({ 
            message: "Login successful!", 
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

module.exports = router;
