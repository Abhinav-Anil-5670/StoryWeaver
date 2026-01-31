const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story.controller');
const authMiddleware = require('../middleware/auth.middleware');

// ==========================================
// 🔒 PROTECTED ROUTES (Must be logged in)
// ==========================================

// Apply the "Guard" to all routes below
router.use(authMiddleware);

// GET /api/stories -> Get all my stories
router.get('/stories', storyController.getAllStories);

// POST /api/stories -> Create a blank story
router.post('/stories', storyController.createStory);

// GET /api/stories/:id -> Get one specific story
router.get('/stories/:id', storyController.getStoryById);

// PUT /api/stories/:id -> Auto-save story content
router.put('/stories/:id', storyController.updateStory);

// POST /api/assist -> "Unstuck" Button (AI Help)
router.post('/assist', storyController.askAI);

// POST /api/generate -> "Genesis" Mode (Full Story Gen)
router.post('/generate', storyController.generateStory);

module.exports = router;