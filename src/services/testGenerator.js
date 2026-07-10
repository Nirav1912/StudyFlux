export function createPrompt(testConfig) {
  return `
You are an expert programming instructor.

Generate exactly ${testConfig.questions} questions.

Programming Language:
${testConfig.language}

Topics:
${
  testConfig.topics.length
    ? testConfig.topics.join(", ")
    : "Entire Language"
}

Difficulty:
${testConfig.difficulty}

Mode:
${testConfig.mode}

Question Types:
${testConfig.formats.join(", ")}

Return ONLY valid JSON.

Each question must contain:

{
"id":1,
"type":"",
"topic":"",
"question":"",
"options":["","","",""],
"answer":"",
"explanation":"",
"hint":"",
"difficulty":""
}

Do not return markdown.

Do not return explanations outside JSON.
`;
}