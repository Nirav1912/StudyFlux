import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem("testResult"));
    setResult(savedResult);
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] flex items-center justify-center text-slate-900">
        <h1 className="text-3xl font-bold">Loading Result...</h1>
      </div>
    );
  }

  const accuracy = Math.round((result.score / result.total) * 100);
function getPerformance() {
  if (accuracy >= 90) {
    return {
      title: "🏆 Excellent",
      stars: "⭐⭐⭐⭐⭐",
      badge: "🥇 Advanced Programmer",
      recommendation:
        "Excellent work! Try increasing the difficulty level for your next test.",
    };
  }

  if (accuracy >= 75) {
    return {
      title: "🎯 Good Job",
      stars: "⭐⭐⭐⭐",
      badge: "🥈 Intermediate Programmer",
      recommendation:
        "You're doing well. Review your weak topics and attempt another test.",
    };
  }

  if (accuracy >= 60) {
    return {
      title: "👍 Keep Practicing",
      stars: "⭐⭐⭐",
      badge: "🥉 Beginner Programmer",
      recommendation:
        "Practice more questions before increasing the difficulty.",
    };
  }

  return {
    title: "📚 Needs Improvement",
    stars: "⭐⭐",
    badge: "🌱 Learner",
    recommendation:
      "Review the explanations carefully and practice the weak topics.",
  };
}

const performance = getPerformance();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] text-slate-900 py-10 px-8">
      <div className="w-full max-w-7xl mx-auto pb-32">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          🎉 Test Completed
        </h1>
         <div className="flex gap-5 mt-10">

        {/* Score Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md">
            <h2 className="text-2xl text-slate-400">
              Final Score
            </h2>

            <p className="text-6xl font-bold text-blue-500 mt-4">
              {result.score} / {result.total}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md">
            <h2 className="text-2xl text-gray-500">
              Accuracy
            </h2>

            <p className="text-6xl font-bold text-green-500 mt-4">
              {accuracy}%
            </p>
          </div>

        </div>
<div className="mt-8 bg-white border border-gray-200 rounded-3xl p-6 shadow-md"

  <h2 className="text-3xl font-bold text-center">
    {performance.title}
  </h2>

  <p className="text-center text-2xl mt-2">
    {performance.stars}
  </p>

  <div className="mt-8">

    <h3 className="text-xl font-bold text-blue-400">
      🏅 Badge Earned
    </h3>

    <p className="mt-2 text-lg">
      {performance.badge}
    </p>

  </div>

  <div className="mt-8">

    <h3 className="text-xl font-bold text-cyan-400">
      🤖 Recommendation
    </h3>

    <p className="mt-2 text-gray-600">
      {performance.recommendation}
    </p>

  </div>

</div>
        {/* Strong Topics */}

        {result.analysis && (
          <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">
  ✅ Strong Topics
</h2>
            <div className="flex flex-wrap gap-3">
              {result.analysis.strongTopics.length > 0 ? (
                result.analysis.strongTopics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-green-600 px-4 py-2 rounded-full"
                  >
                    {topic}
                  </span>
                ))
              ) : (
                <p>No strong topics yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Weak Topics */}

        {result.analysis && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
  ⚠️ Weak Topics
</h2>

            <div className="flex flex-wrap gap-3">
              {result.analysis.weakTopics.length > 0 ? (
                result.analysis.weakTopics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-red-600 px-4 py-2 rounded-full"
                  >
                    {topic}
                  </span>
                ))
              ) : (
                <p>No weak topics 🎉</p>
              )}
            </div>
          </div>
        )}

        {/* Review */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Review Answers
          </h2>

          {result.questions.map((q, index) => (
            <div
  key={index}
  className="w-full bg-white border border-gray-200 rounded-3xl p-8 mb-6 shadow-md"
>
              <h3 className="text-xl font-semibold">
                Q{index + 1}. {q.question}
              </h3>

              <p className="mt-4 text-green-400">
                ✅ Correct Answer: {q.answer}
              </p>

              <p className="mt-2 text-red-400">
                ❌ Your Answer: {result.answers[index] || "Not Answered"}
              </p>

              <details className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">

  <summary className="cursor-pointer text-cyan-500 font-bold">
    🤖 Show AI Explanation
  </summary>

  <p className="mt-4 text-gray-600">
    {q.explanation}
  </p>

</details>

            </div>
          ))}

        </div>

        {/* Buttons */}

       

          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/create-test"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
          >
            Create New Test
          </Link>

        </div>

      </div>
    </div>
  );
}