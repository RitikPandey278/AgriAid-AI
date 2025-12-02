import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: ["https://sweet-lollipop-be0eb5.netlify.app","http://localhost:5173","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true }));
  app.options("*", cors());

  app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "https://sweet-lollipop-be0eb5.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    
    if
    (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ Connection Error:", err));

// Auth Routes
app.use("/api/auth", authRoutes);

// Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;

    if (!message || !lang) {
      return res.status(400).json({ error: "Message and language required" });
    }

    const langMap = {
      hi: "Hindi",
      en: "English",
      bho: "Bhojpuri",
      pa: "Punjabi",
    };

    const selectedLang = langMap[lang] || "Hindi";

    const systemPrompt = `
You are AgriAid AI, a farming expert.

LANGUAGE RULE:
- User selected language: ${selectedLang}
- ALWAYS reply ONLY in ${selectedLang}. No mixing.

STRICT SAFETY RULE:
- Do NOT give fake mandi rates, weather, crop price, scheme amounts.
- If asked for market rate → Reply: "Live market rate main nahi de sakta."
- Then guide user to Agmarknet, e-Nam or local mandi.

ANSWER RULE:
- Keep answers short, clear and practical.
- Give only farming related info:
  - Sowing
  - Irrigation
  - Fertilizer
  - Pest control
  - Disease cure
  - Harvesting
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices) {
      console.error("❌ OpenRouter Error:", data);
      return res.status(500).json({
        error: "AI service error — try again later.",
      });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ error: "Server issue — try again." });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("🌾 AgriAid AI Server Running Perfectly!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
