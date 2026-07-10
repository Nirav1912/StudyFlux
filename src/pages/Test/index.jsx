import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTestResult } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";
import { analyzePerformance } from "../../ai/analyzePerformance";

export default function Test() {

    const navigate = useNavigate();
    

  const questions = JSON.parse(localStorage.getItem("generatedTest")) || [];
  if (!questions.length) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <h1 className="text-3xl">No Test Generated</h1>
    </div>
  );
}
const { user } = useAuth();
const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

const [timeLeft, setTimeLeft] = useState(
  (JSON.parse(localStorage.getItem("testConfig"))?.duration || 20) * 60
);

  const question = questions[current] || {};
const config = JSON.parse(
  localStorage.getItem("testConfig")
);

const examMode = config?.mode === "Exam";
  function nextQuestion() {
    
    setShowExplanation(false);

    if (current < questions.length - 1) {
  setCurrent(current + 1);
} else {
  submitTest();
}
  }
  async function submitTest() {
  if (submitted) return;

  setSubmitted(true);

  let score = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.answer) {
      score++;
    }
  });

  const config = JSON.parse(localStorage.getItem("testConfig"));

const result = {
  user_id: user.id,
  language: config.language,
  difficulty: config.difficulty,
  score,
  total: questions.length,
  accuracy: Math.round((score / questions.length) * 100),
  completed_at: new Date().toISOString(),
};
const analysis = analyzePerformance(
  questions,
  answers
);
  try {
    await saveTestResult(result);

    localStorage.setItem(
  "testResult",
  JSON.stringify({
    ...result,
    answers,
    questions,
    analysis,
  })
);

    navigate("/result");
  } catch (error) {
  console.error("Submit Error:", error);
  alert(JSON.stringify(error, null, 2));
  setSubmitted(false);
}
}
useEffect(() => {
  if (timeLeft <= 0) {
    submitTest();
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [timeLeft]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] py-10 px-6">

    <div className="max-w-7xl mx-auto px-4">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            Question {current + 1} / {questions.length}
          </h2>

          <p className="text-gray-500 mt-1">
            {question.topic}
          </p>

        </div>

        <div className="bg-red-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg">

          {`${Math.floor(timeLeft / 60)}:${String(
            timeLeft % 60
          ).padStart(2, "0")}`}

        </div>

      </div>

      {/* Progress Bar */}

      <div className="w-full h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />

      </div>

      {/* Main Card */}

    <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full max-w-5xl mx-auto">
        <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

          {question.topic}

        </span>

        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-8 overflow-x-auto">

  <pre className="whitespace-pre-wrap break-words text-slate-900 text-lg leading-relaxed font-mono">
    {question.question}
  </pre>

</div>

        {/* Options */}

        <div className="mt-10 space-y-4">

          {(question.options || []).map((option) => (

            <button
              key={option}
              onClick={() =>
                setAnswers((prev) => ({
                  ...prev,
                  [current]: option,
                }))
              }
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all text-lg ${
                answers[current] === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-slate-900 border-gray-200 hover:bg-gray-100"
              }`}
            >

              {option}

            </button>

          ))}

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-3 gap-4 mt-10">

  {!examMode && (
  <button
    onClick={() => {
      if (!answers[current]) {
        showWarning("Please select an answer.");
        return;
      }

      setShowExplanation(true);
    }}
    className="bg-green-600 hover:bg-green-700 px-8 py-5 rounded-4xl text-white font-bold"
  >
    ✅ Check Answer
  </button>
)}

  <button
    onClick={() => {
      if (current === questions.length - 1) {
        submitTest();
      } else {
        nextQuestion();
      }
    }}
    className="bg-purple-600 hover:bg-purple-700 px-8 py-5 rounded-4xl text-white font-bold"
  >
    ➡️ Next
  </button>

  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to submit the test?")) {
        submitTest();
      }
    }}
    className="bg-red-600 hover:bg-red-700 px-8 py-5 rounded-4xl text-white font-bold"
  >
    🚀 Submit Test
  </button>

</div>

        {/* Explanation */}

        {showExplanation && !examMode && (

          <div className="mt-10 bg-gray-100 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-green-600">

              ✅ Correct Answer

            </h2>

            <p className="mt-3 text-slate-900 text-lg">

              {question.answer}

            </p>

            <h3 className="mt-6 text-2xl font-bold text-blue-600">

              🤖 AI Explanation

            </h3>

            <p className="mt-3 text-gray-700 text-lg">

              {question.explanation}

            </p>

          </div>

        )}

      </div>

    </div>

  </div>
);
}