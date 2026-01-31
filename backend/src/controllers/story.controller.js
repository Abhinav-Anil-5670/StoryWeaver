const Story = require('../models/story.model');
const aiService = require('../services/ai.service');
const stripHTML = (html) => {
    return html
        .replace(/<[^>]*>?/gm, '')  // Remove all <tags>
        .replace(/&nbsp;/g, ' ')    // Replace &nbsp; with normal space
        .replace(/\s+/g, ' ')       // Collapse extra spaces
        .trim();                    // Remove leading/trailing space
}

// ==========================================
// 📚 STORY MANAGEMENT (CRUD)
// ==========================================

// 1. GET ALL STORIES
// Only fetches stories belonging to the logged-in user
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find({ author: req.user.id })
            .sort({ lastUpdated: -1 }); // Newest first
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stories" });
    }
};

// 2. CREATE NEW STORY (Manual Start)
exports.createStory = async (req, res) => {
    try {
        const { title, genre } = req.body;

        const newStory = new Story({
            title,
            genre,
            author: req.user.id // Link to the user!
        });

        await newStory.save();
        res.json(newStory);
    } catch (error) {
        res.status(500).json({ error: "Failed to create story" });
    }
};

// 3. GET SINGLE STORY
exports.getStoryById = async (req, res) => {
    try {
        // Security Check: Ensure the story belongs to the requesting user
        const story = await Story.findOne({
            _id: req.params.id,
            author: req.user.id
        });

        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }
        res.json(story);
    } catch (error) {
        res.status(500).json({ error: "Error fetching story" });
    }
};

// 4. UPDATE STORY (Auto-Save)
exports.updateStory = async (req, res) => {
    try {
        const { content } = req.body;

        const updatedStory = await Story.findOneAndUpdate(
            { _id: req.params.id, author: req.user.id },
            { content, lastUpdated: Date.now() },
            { new: true } // Return the updated document
        );

        if (!updatedStory) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.json({ status: "saved", updatedAt: updatedStory.lastUpdated });
    } catch (error) {
        res.status(500).json({ error: "Failed to save" });
    }
};

// ==========================================
// 🧠 AI FEATURES
// ==========================================

// 5. THE "UNSTUCK" BUTTON
exports.askAI = async (req, res) => {
    try {
        // frontend sends: { storyContent, type }
        const { storyContent, type } = req.body;
        const cleanText = stripHTML(storyContent);

        let prompt = "";

        // Construct the prompt based on the user's choice
        if (type === 'plot_twist') {
            prompt = `Read this story context: "${cleanText}". The author is stuck. Suggest a surprising plot twist that could happen next. Keep it under 3 sentences.`;
        } else if (type === 'scene_description') {
            prompt = `Read this story context: "${cleanText}". Take the very last sentence and rewrite it as a vivid, sensory-rich paragraph.`;
        } else if (type === 'character_chat') {
            prompt = `Read this story context: "${cleanText}". Assume the persona of the main character. Answer the user's question: "What would you do next?" Answer in first person.`;
        } else if (type === 'custom_prompt') {
            // Expecting 'customPrompt' from the body
            const { customPrompt } = req.body;
            if (!customPrompt) return res.status(400).json({ error: "Custom prompt is required" });
            prompt = `Read this story context: "${cleanText}". User Request: "${customPrompt}". Respond to the user's request based on the story.`;
        } else {
            return res.status(400).json({ error: "Invalid assistance type" });
        }

        // Call our AI Service
        const suggestion = await aiService.generateText(prompt);

        // Respond exactly how frontend expects it
        res.json({ suggestion });

    } catch (error) {
        console.error("AI Assist Error:", error);
        res.status(500).json({ error: "AI generation failed" });
    }
};

// 6. THE "GENESIS" MODE (Generate Full Story)
exports.generateStory = async (req, res) => {
    try {
        const { genre, prompt } = req.body;

        const aiPrompt = `Write a creative short story (approx 500 words) in the ${genre} genre based on this idea: "${prompt}". Format the output with simple HTML tags (use <p> for paragraphs, <h2> for titles). Do not use Markdown.`;

        const generatedContent = await aiService.generateText(aiPrompt);

        // Create the story in the DB immediately
        const newStory = new Story({
            title: `AI Generated: ${prompt.substring(0, 20)}...`,
            genre: genre,
            content: generatedContent,
            author: req.user.id
        });

        await newStory.save();

        res.json(newStory);

    } catch (error) {
        console.error("Genesis Error:", error);
        res.status(500).json({ error: "Story generation failed" });
    }
};