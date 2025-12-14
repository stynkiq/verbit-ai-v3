// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI with your environment variable
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Backend AI error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
