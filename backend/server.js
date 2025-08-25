const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());              // allow all origins for dev
app.use(express.json());      // parses JSON bodies

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 🔹 Chat endpoint (focused on ISL learning & inclusivity)
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ response: "Invalid prompt." });
    }

    // Modify prompt for ISL context
    const modifiedPrompt = `You are an AI tutor for Indian Sign Language (ISL) learning and inclusivity for deaf learners. 
    Keep your response under 60 words. 
    Question: ${prompt}`;

    const result = await model.generateContent(modifiedPrompt);
    const text = result?.response?.text?.() || "I couldn't generate a reply.";
    res.json({ response: text });
  } catch (err) {
    console.error("Chat error:", err?.response?.data || err.message || err);
    res.status(500).json({ response: "Server error. Try again." });
  }
});

// 🔹 Extra endpoint for ISL learning plan
app.post("/api/isl-plan", async (req, res) => {
  try {
    const { skillLevel, preferredTopic } = req.body;

    if (!skillLevel) {
      return res.status(400).json({ error: "Skill level is required" });
    }

    const prompt = `Create a 1-week Indian Sign Language (ISL) learning plan for a learner.
    Skill level: ${skillLevel}.
    Topic: ${preferredTopic || "basic daily communication"}.
    Provide day-wise activities in less than 80 words.`;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "Couldn't generate plan.";
    res.json({ islPlan: text });
  } catch (err) {
    console.error("ISL Plan error:", err?.response?.data || err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API up at http://localhost:${PORT}`);
});
