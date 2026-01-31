const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// We use the 'flash' model for speed and efficiency
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates text based on a prompt using Google Gemini.
 * @param {string} prompt - The full prompt including instructions and story context.
 * @returns {string} - The generated text response.
 */
exports.generateText = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("AI Generation failed");
    }
};