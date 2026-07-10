export function buildPrompt(config) {
  const topics =
    config.topics.length > 0
      ? config.topics.join(", ")
      : "Complete Language";

  return `
You are an expert programming teacher.

Generate exactly ${config.questions} programming questions.

Programming Language:
${config.language}

Topics:
${topics}

Difficulty:
${config.difficulty}

Mode:
${config.mode}

Question Types:
${config.formats.join(", ")}

Return ONLY valid JSON.

Format:

{
  "questions":[
    {
      "topic":"Strings",
      "type":"MCQ",
      "question":"Question",
      "options":[
        "A",
        "B",
        "C",
        "D"
      ],
      "answer":"Correct Option",
      "explanation":"Short explanation"
    }
  ]
}

Rules:

- No markdown
- No \`\`\`
- No extra text
- Exactly ${config.questions} questions
- Four options for every MCQ
- Explanation must be short
- Questions must be unique
`;
}