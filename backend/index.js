import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], credentials: true })); // Frontend origin
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ Connection Error:", err));

// ✅ Auth Routes
app.use("/api/auth", authRoutes);

// ✅ Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `तुम एक अनुभवी कृषि विशेषज्ञ हो जो भारतीय किसानों को फसल, बुवाई का समय, खाद, सिंचाई और कीटनाशक के बारे में ${
      lang === "en" ? "English" : "Hindi"
    } में आसान और संक्षिप्त सलाह देता है।`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ OpenAI Error:", data.error);
      return res.status(500).json({
        error:
          data.error.code === "insufficient_quota"
            ? "आपकी OpenAI क्वोटा खत्म हो गई है। कृपया अपना प्लान चेक करें।"
            : "AI service error. कृपया बाद में प्रयास करें।",
      });
    }

    res.json({
      reply:
        data?.choices?.[0]?.message?.content ||
        "मुझे अभी उस सवाल का सटीक उत्तर नहीं मिला, कृपया थोड़ा और विवरण दें।",
    });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "कुछ तकनीकी समस्या हुई — कृपया बाद में पुन: प्रयास करें।" });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🌾 AgriAid AI Server is Running Perfectly!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
