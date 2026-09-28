const { callGemini } = require('../services/geminiService');

const summarizeBlog = async (req, res) => {
  try {
    // Both 'text' and 'content' keys supported dynamically
    const inputText = req.body.text || req.body.content;

    if (!inputText) {
      return res.status(400).json({ message: "Text to summarize is required" });
    }

    const prompt = `Summarize the following text concisely:\n\n${inputText}`;
    const summary = await callGemini(prompt);

    return res.status(200).json({
      message: "Summary generated successfully",
      summary: summary
    });
  } catch (error) {
    console.error("Summarize Error:", error.message);
    return res.status(500).json({ message: error.message || "Failed to generate summary" });
  }
};

const generateBlog = async (req, res) => {
  try {
    const { topic, category } = req.body;

    if (!topic || !category) {
      return res.status(400).json({ message: "Topic and category are required" });
    }

    const prompt = `Write a detailed blog post about ${topic} in the ${category} category.`;
    const aiContent = await callGemini(prompt);

    return res.status(201).json({
      message: "Blog generated successfully",
      content: aiContent
    });
  } catch (error) {
    console.error("Generate Blog Error:", error.message);
    return res.status(500).json({ message: error.message || "Failed to generate blog" });
  }
};

module.exports = {
  summarizeBlog,
  generateBlog
};