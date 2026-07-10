import { useEffect, useState } from "react";

export default function Achievements() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("allResults")) || [];
    setResults(saved);
  }, []);

  const tests = results.length;
  const best = results.length
    ? Math.max(...results.map(r => r.accuracy))
    : 0;

  const badges = [
    {
      title: "First Test",
      unlocked: tests >= 1,
      icon: "🥉",
    },
    {
      title: "10 Tests",
      unlocked: tests >= 10,
      icon: "🥈",
    },
    {
      title: "90% Accuracy",
      unlocked: best >= 90,
      icon: "🥇",
    },
    {
      title: "AI Master",
      unlocked: tests >= 50,
      icon: "👑",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        Achievements
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {badges.map((badge) => (
          <div
            key={badge.title}
            className={`rounded-2xl p-8 text-center ${
              badge.unlocked
                ? "bg-green-700"
                : "bg-slate-900 opacity-40"
            }`}
          >
            <div className="text-6xl">
              {badge.icon}
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {badge.title}
            </h2>

            <p className="mt-3">
              {badge.unlocked
                ? "Unlocked"
                : "Locked"}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}