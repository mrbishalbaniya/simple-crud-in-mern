const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    // Check if the header has a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header (format: "Bearer <token>")
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');

            // Add the user ID to the request object so controllers can use it
            req.user = decoded.userId;

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect;