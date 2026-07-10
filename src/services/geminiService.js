import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateGeminiTest(prompt) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error(`Gemini Attempt ${attempt} failed:`, error);

      // Retry only if the server is temporarily unavailable
      if (
        error.message?.includes("503") ||
        error.message?.includes("UNAVAILABLE") ||
        error.status === "UNAVAILABLE"
      ) {
        if (attempt < MAX_RETRIES) {
          await delay(2000 * attempt); // 2s, 4s, 6s
          continue;
        }

        throw new Error(
          "Gemini AI is currently experiencing high traffic. Please try again in a few moments."
        );
      }

      // Any other error
      throw error;
    }
  }
}