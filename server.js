
// // import express from "express";
// // import cors from "cors";
// // import cropRoutes from "./routes/cropRoutes.js";
// // import knowledgeRoutes from "./routes/knowledgeRoutes.js";
// // import pestRoutes from "./routes/pestRoutes.js";
// // import weatherRoutes from "./routes/weatherRoutes.js";   // 👈 add
// // import marketRoutes from "./routes/marketRoutes.js";     // 👈 add

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use("/api/crops", cropRoutes);
// // app.use("/api/knowledge", knowledgeRoutes);
// // app.use("/api/pests", pestRoutes);
// // app.use("/api/weather", weatherRoutes);   // 👈 add
// // app.use("/api/market", marketRoutes);     // 👈 add

// // app.get("/", (req, res) => {
// //   res.send("KrishiMitra backend running...");
// // });

// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";
// import cropRoutes from "./routes/cropRoutes.js";
// import knowledgeRoutes from "./routes/knowledgeRoutes.js";
// import pestRoutes from "./routes/pestRoutes.js";
// import weatherRoutes from "./routes/weatherRoutes.js";
// import marketRoutes from "./routes/marketRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Existing routes
// app.use("/api/crops", cropRoutes);
// app.use("/api/knowledge", knowledgeRoutes);
// app.use("/api/pests", pestRoutes);
// app.use("/api/weather", weatherRoutes);
// app.use("/api/market", marketRoutes);

// // ✅ New AI Ask route
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// app.post("/api/ask-ai", async (req, res) => {
//   try {
//     const { question, language } = req.body;

//     const prompt =
//       language === "EN"
//         ? `Answer this agricultural question in English: ${question}`
//         : `Answer this agricultural question in Hindi: ${question}`;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const answer = completion.choices[0].message.content;
//     res.json({ answer });
//   } catch (error) {
//     console.error("Error in /api/ask-ai:", error);
//     res
//       .status(500)
//       .json({ answer: language === "EN" ? "Something went wrong." : "कुछ गलत हो गया।" });
//   }
// });

// // Test root
// app.get("/", (req, res) => {
//   res.send("KrishiMitra backend running...");
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });







// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";
// import cropRoutes from "./routes/cropRoutes.js";
// import knowledgeRoutes from "./routes/knowledgeRoutes.js";
// import pestRoutes from "./routes/pestRoutes.js";
// import weatherRoutes from "./routes/weatherRoutes.js";
// import marketRoutes from "./routes/marketRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Existing routes
// app.use("/api/crops", cropRoutes);
// app.use("/api/knowledge", knowledgeRoutes);
// app.use("/api/pests", pestRoutes);
// app.use("/api/weather", weatherRoutes);
// app.use("/api/market", marketRoutes);

// // ✅ OpenAI client
// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OPENAI_API_KEY not found in .env");
//   process.exit(1);
// }

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// console.log("✅ OpenAI API Key Loaded");

// // ✅ AI Ask route
// app.post("/api/ask-ai", async (req, res) => {
//   const { question, language } = req.body;

//   if (!question || !question.trim()) {
//     return res.status(400).json({ answer: "Question is required." });
//   }

//   try {
//     const prompt = language === "EN"
//       ? `Answer this agricultural question in English: ${question}`
//       : `Answer this agricultural question in Hindi: ${question}`;

//     console.log("Prompt sent to OpenAI:", prompt);

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",  // safest fallback
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     const answer = completion.choices?.[0]?.message?.content?.trim();

//     if (!answer) {
//       console.error("❌ No answer returned from OpenAI.");
//       return res.status(500).json({ answer: language === "EN" ? "No answer from AI." : "AI से कोई उत्तर नहीं मिला।" });
//     }

//     console.log("OpenAI Answer:", answer);
//     res.json({ answer });

//   } catch (err) {
//     console.error("❌ OpenAI API Error:", err);
//     res.status(500).json({ answer: language === "EN" ? "Something went wrong." : "कुछ गलत हो गया।" });
//   }
// });

// // Test root route
// app.get("/", (req, res) => {
//   res.send("✅ KrishiMitra backend running...");
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });












import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import cropRoutes from "./routes/cropRoutes.js";
import knowledgeRoutes from "./routes/knowledgeRoutes.js";
import pestRoutes from "./routes/pestRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api/crops", cropRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/pests", pestRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/market", marketRoutes);

// ✅ OpenAI client
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("✅ OpenAI API Key Loaded");

// ✅ AI Ask route with context
app.post("/api/ask-ai", async (req, res) => {
  const { question, language, weather, market, recommendations, schemes } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ answer: language === "EN" ? "Question is required." : "प्रश्न आवश्यक है।" });
  }

  try {
    // Construct prompt with context for Agentic AI
    const prompt = `
You are an AI agricultural assistant for India.
Answer the user's question in ${language === "EN" ? "English" : "Hindi"}.
User question: "${question}"

Use the following context to provide a complete and helpful answer:

Weather: ${JSON.stringify(weather)}
Market Prices: ${JSON.stringify(market)}
Crop Recommendations: ${JSON.stringify(recommendations)}
Government Schemes: ${JSON.stringify(schemes)}

Provide actionable advice, reference schemes if relevant, and explain reasoning clearly.
    `;

    console.log("Prompt sent to OpenAI:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // better reasoning than gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      console.error("❌ No answer returned from OpenAI.");
      return res.status(500).json({ answer: language === "EN" ? "No answer from AI." : "AI से कोई उत्तर नहीं मिला।" });
    }

    console.log("OpenAI Answer:", answer);
    res.json({ answer });

  } catch (err) {
    console.error("❌ OpenAI API Error:", err);
    res.status(500).json({ answer: language === "EN" ? "Something went wrong." : "कुछ गलत हो गया।" });
  }
});

// Test root route
app.get("/", (req, res) => {
  res.send("✅ KrishiMitra backend running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
