const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/auth/register -> Create a new user
router.post('/register', authController.register);

// POST /api/auth/login -> Log in and get a token
router.post('/login', authController.login);

// GET /api/auth/me -> Get current user profile (Protected)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;