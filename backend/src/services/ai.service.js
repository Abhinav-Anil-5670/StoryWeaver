// We use the new SDK package now
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

// Initialize the client with your API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generates text based on a prompt using Google Gemini.
 * @param {string} prompt - The full prompt including instructions and story context.
 * @returns {string} - The generated text response.
 */
exports.generateText = async (prompt) => {
    try {
        // New SDK Syntax
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // Using the stable Flash model
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        // In the new SDK, response.text is often a getter or method depending on version.
        // The snippet you provided accesses it as a property: response.text
        // If that returns null/undefined, we check strictly.
        const text = response.text || "No response generated.";

        return text;

    } catch (error) {
        console.error("Gemini SDK Error:", error);
        throw new Error("AI Generation failed");
    }
};