import { useEffect, useState } from "react";

export default function StudyPlan() {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("testResult"));

    if (!result?.analysis) return;

    const weak = result.analysis.weakTopics;

    setPlan({
      day1: weak.slice(0, 2),
      day2: weak.slice(2, 4),
      day3: weak.slice(4, 6),
      day4: weak.slice(0, 2),
      day5: weak.slice(2, 4),
      day6: weak.slice(4, 6),
      day7: ["Mock Test"],
    });
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        No Study Plan Available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        📅 AI Study Plan
      </h1>

      {Object.entries(plan).map(([day, topics]) => (
        <div
          key={day}
          className="bg-slate-900 rounded-2xl p-6 mb-5"
        >
          <h2 className="text-2xl font-bold capitalize">
            {day}
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">
            {topics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-600 px-4 py-2 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}