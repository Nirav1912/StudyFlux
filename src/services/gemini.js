import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Change this one line if you ever need a different model
const MODEL = "gemini-2.0-flash";

// ================================
// AI Test Generator
// ================================

export async function generateQuestions(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ================================
// Universal Topic Detection
// ================================

export async function detectTopic(query) {
  try {
    const prompt = `
You are an AI education classifier.

Analyze the user's input and return ONLY valid JSON.

User Input:
"${query}"

Return format:

{
  "education": "",
  "course": "",
  "subject": "",
  "topic": "",
  "difficulty": ""
}

Rules:
- Detect education level
- Detect course
- Detect subject
- Detect topic
- Detect difficulty
- Return JSON only.
`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return JSON.parse(
      response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ================================
// Learn Content
// ================================

export async function generateLearnContent(topic) {
  const prompt = `
You are an expert teacher.

Teach this topic:

Topic: ${topic.topic}
Subject: ${topic.subject}
Course: ${topic.course}
Education: ${topic.education}
Difficulty: ${topic.difficulty}

Generate markdown with:

# Overview

# Simple Explanation

# Real Life Example

# Important Points

# Common Mistakes

# Interview Tips

If programming include code examples.
`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text;
}

// ================================
// Notes
// ================================

export async function generateNotes(topic) {
  const prompt = `
Create beautiful exam revision notes.

Topic: ${topic.topic}

Subject: ${topic.subject}

Return markdown.

Include:

# Definition

# Key Concepts

# Important Points

# Examples

# Table

# Exam Tips

# Short Revision
`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text;
}

// ================================
// Flashcards
// ================================

export async function generateFlashcards(topic) {
  const prompt = `
Generate 10 flashcards.

Topic:

${topic.topic}

Return ONLY JSON.

[
 {
   "question":"",
   "answer":""
 }
]
`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return JSON.parse(
    response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
}

// ================================
// Mind Map
// ================================

export async function generateMindMap(topic) {
  const prompt = `
Create a mind map.

Topic:

${topic.topic}

Return ONLY JSON.

[
 {
   "title":"",
   "points":[
      "",
      "",
      ""
   ]
 }
]
`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return JSON.parse(
    response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
}

// ================================
// PYQ Analyzer
// ================================

export async function analyzePYQs(papers) {
  const prompt = `
You are an exam analyzer.

Below are previous year papers.

${papers.map((p, i) => `
Paper ${i + 1}

${p.text}
`).join("\n\n")}

Return ONLY JSON.

{
  "importantTopics":[
    {
      "topic":"",
      "weightage":""
    }
  ],
  "repeatedQuestions":[
    ""
  ],
  "expectedQuestions":[
    ""
  ],
  "frequentlyAskedConcepts":[
    ""
  ],
  "examDifficulty":"",
  "preparationTips":[
    ""
  ]
}
`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return JSON.parse(
    response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
}