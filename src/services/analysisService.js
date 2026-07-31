import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzePerformance(result) {
  const prompt = `
You are an expert programming mentor.

Analyze this programming test result.

Score:
${result.score}/${result.total}

Accuracy:
${result.accuracy}%

Questions:
${JSON.stringify(result.questions)}

User Answers:
${JSON.stringify(result.answers)}

Return ONLY valid JSON in this format.

{
  "overall":"Excellent",
  "rating":5,
  "strengths":["Topic1","Topic2"],
  "weaknesses":["Topic1","Topic2"],
  "recommendation":"Short recommendation",
  "nextDifficulty":"Medium",
  "badge":"Advanced Programmer"
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
}