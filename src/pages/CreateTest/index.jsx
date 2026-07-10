import { useState } from "react";
import { useNavigate } from "react-router-dom";
import programmingLanguages from "../../data/programmingLanguages";
import { showSuccess } from "../../utils/toast";
import { buildPrompt } from "../../ai/promptBuilder";
import { generateGeminiTest } from "../../services/geminiService";
import { parseGeminiResponse } from "../../ai/responseParser";
export default function CreateTest() {
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState(programmingLanguages[0]);

  const [selectedTopics, setSelectedTopics] = useState([]);

  const [difficulty, setDifficulty] = useState("Easy");

  const [mode, setMode] = useState("Practice");

  const [formats, setFormats] = useState(["MCQ"]);

  const [duration, setDuration] = useState(20);

  const [questions, setQuestions] = useState(20);

  const difficulties = ["Easy", "Medium", "Hard"];

  const modes = ["Practice", "Exam", "Revision"];

  const questionFormats = [
    "MCQ",
    "Code Output",
    "Find Error",
    "Fill Code",
    "Code Completion",
  ];

  function toggleTopic(topic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(
        selectedTopics.filter((t) => t !== topic)
      );
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }

  function toggleFormat(format) {
  if (formats.includes(format)) {
    if (formats.length === 1) return; // Don't allow zero formats
    setFormats(formats.filter((f) => f !== format));
  } else {
    setFormats([...formats, format]);
  }
}

  const navigate = useNavigate();

async function generateTest() {
  try {
    setLoading(true);

    const prompt = buildPrompt({
      language: language.name,
      topics: selectedTopics,
      difficulty,
      mode,
      formats,
      questions,
    });

    const response = await generateGeminiTest(prompt);

    console.log("Gemini Response:", response);

    const parsed = parseGeminiResponse(response);

    if (
  !parsed ||
  !parsed.questions ||
  !Array.isArray(parsed.questions)
) {
      showError("AI returned invalid data.");
      return;
    }
    localStorage.setItem(
  "testConfig",
  JSON.stringify({
    language: language.name,
    difficulty,
    mode,
    duration,
    questions,
    topics: selectedTopics,
  })
);

    localStorage.setItem(
      "generatedTest",
      JSON.stringify(parsed.questions)
    );

    navigate("/test");
  } catch (error) {
    console.error(error);
    console.error(error);

alert(
  error.message ||
    "Something went wrong while generating the AI test."
);
  } finally {
    setLoading(false);
  }
}

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] text-slate-900">

      <div className="w-full px-8 pt-36 pb-40">

  <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

    {/* Put ALL your page content here */}

  </div>

</div>

        <div className="flex items-center gap-6 mb-8">

  <div className="w-24 h-24 rounded-[28px] bg-red-50 flex items-center justify-center text-6xl">
    📝
  </div>

  <div>

    <h1 className="text-7xl font-black">
      Create AI Test
    </h1>

    <p className="text-2xl text-gray-500 mt-2">
      Customize your programming test.
    </p>

  </div>

</div>

        <p className="text-slate-400 mb-10">
          Customize your programming test.
        </p>

        {/* Language */}

        <div className="mb-8">

          <label className="block mb-3 text-lg font-semibold">

            Programming Language

          </label>

          <select
            value={language.name}
            onChange={(e) =>
              setLanguage(
                programmingLanguages.find(
                  (l) => l.name === e.target.value
                )
              )
            }
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-slate-900"
          >
            {programmingLanguages.map((item) => (
              <option
  key={item.id}
  value={item.name}
  className="bg-white text-slate-900"
>
  {item.name}
</option>
            ))}
          </select>

        </div>

        {/* Topics */}

        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            Topics (Optional)
          </h2>

          
<div className="mb-8">

  <h2 className="text-lg font-semibold mb-4">
    Topics
  </h2>

  <select
    value={selectedTopics[0] || ""}
    onChange={(e) => setSelectedTopics([e.target.value])}
    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-slate-900"
  >

    <option value="">
      Select Topic
    </option>

    {language.topics.map((topic) => (
      <option
        key={topic}
        value={topic}
      >
        {topic}
      </option>
    ))}

  </select>

</div>

        </div>

        {/* Difficulty */}

        <div className="mb-8">

          <h2 className="text-lg font-semibold mb-4">
            Difficulty
          </h2>

          <select
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
  className="w-full p-4 rounded-2xl bg-white border border-gray-300 text-slate-900 outline-none shadow-sm"
>
  {difficulties.map((item) => (
    <option
  key={item}
  value={item}
  className="bg-white text-slate-900"
>
  {item}
</option>
  ))}
</select>

        </div>

        {/* Mode */}

        {/* Mode */}

<div className="mb-8">

  <h2 className="text-lg font-semibold mb-4">
    Test Mode
  </h2>

  <select
  value={mode}
  onChange={(e) => setMode(e.target.value)}
  className="w-full bg-white border border-gray-300 rounded-xl p-4 text-slate-900"
>
  {modes.map((item) => (
    <option
  key={item}
  value={item}
  className="bg-white text-slate-900"
>
  {item}
</option>
  ))}
</select>

</div>

        {/* Question Formats */}

        {/* Question Formats */}

<div className="mb-8">

  <h2 className="text-lg font-semibold mb-4">
    Question Format
  </h2>

 <select
  value={formats[0]}
  onChange={(e) => setFormats([e.target.value])}
  className="w-full bg-white border border-gray-300 rounded-xl p-4 text-slate-900"
>
  
  {questionFormats.map((item) => (
    <option key={item} value={item}>
      {item}
      className="bg-white text-slate-900"
    </option>
  ))}
</select>

</div>

        {/* Duration */}

        <div className="mb-8">

          <label className="block mb-3 font-semibold">

            Duration (Minutes)

          </label>

          <input
  type="number"
  min="1"
  max="180"
  value={duration}
  onChange={(e) =>
    setDuration(Math.max(1, Number(e.target.value)))
  }
  className="w-full bg-white border border-gray-300 p-4 rounded-xl text-slate-900"
/>

        </div>

        {/* Questions */}

        <div className="mb-10">

          <label className="block mb-3 font-semibold">

            Number of Questions

          </label>

          <input
  type="number"
  min="1"
  max="50"
  value={questions}
  onChange={(e) =>
    setQuestions(Math.max(1, Number(e.target.value)))
  }
  className="w-full bg-white border border-gray-300 p-4 rounded-xl text-slate-900"
/>

        </div>

        <button
  onClick={generateTest}
  disabled={loading}
  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-5 rounded-2xl text-xl font-bold"
>
  {loading
    ? "🤖 AI is generating your test..."
    : "🚀 Generate AI Test"}
</button>

      </div>

    
  );
}