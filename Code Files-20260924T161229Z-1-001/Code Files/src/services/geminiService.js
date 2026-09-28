const { GoogleGenerativeAI } = require('@google/generative-ai');

const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing in .env file');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Active Gemini 2.5 Flash model
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const textPrompt = typeof prompt === 'object' ? JSON.stringify(prompt) : prompt;
    const result = await model.generateContent(textPrompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Failed to generate response");
  }
};

module.exports = { callGemini };