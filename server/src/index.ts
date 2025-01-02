import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const GEMINI_KEY = process.env.GEMINI_API_KEY || "";

app.get("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Generate 10 multiple-choice questions on the topic 'Optics Physics'. Each question should be in a JSON format with the following structure: an object with 'question', 'options' (an array with 4 options), and 'answer' (the correct answer). Ensure the options are plausible, and the answer is one of the options in each question.";

  const result = await model.generateContent(prompt);

  res.send(result.response.text());
});

app.listen(3000, () => {});
