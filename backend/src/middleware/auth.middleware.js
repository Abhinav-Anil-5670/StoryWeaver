const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get the token from the header
    // Format expected: "Authorization: Bearer <token>"
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // 2. Check if no token exists
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Add the user payload to the request object so controllers can use it
        req.user = decoded;

        next(); // Move to the next middleware/controller
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};