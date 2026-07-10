import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserResults } from "../../api/testApi";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Progress() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user) return;

      const data = await getUserResults(user.id);
      setResults(data || []);
    }

    load();
  }, [user]);

  const chartData = results
    .slice()
    .reverse()
    .map((item, index) => ({
      test: `T${index + 1}`,
      accuracy: item.accuracy,
    }));

  const testsTaken = results.length;

  const avgAccuracy =
    testsTaken > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.accuracy, 0) /
            testsTaken
        )
      : 0;

  const bestScore =
    testsTaken > 0
      ? Math.max(...results.map((r) => r.score))
      : 0;

  const totalQuestions =
    results.reduce((sum, r) => sum + r.total, 0);

  const totalCorrect =
    results.reduce((sum, r) => sum + r.score, 0);

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] px-8 pt-36 pb-40">

    {/* Background blur */}

    <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-red-100 opacity-50 blur-[180px] rounded-full"></div>

    <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-pink-100 opacity-50 blur-[180px] rounded-full"></div>

    <div className="relative w-full bg-white rounded-[32px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">

      {/* Header */}

      <div className="flex items-center gap-6 mb-10">

        <div className="w-24 h-24 rounded-[28px] bg-red-50 flex items-center justify-center text-6xl">
          📊
        </div>

        <div>

          <h1 className="text-7xl font-black text-slate-900">
            My Progress
          </h1>

          <p className="text-2xl text-gray-500 mt-2">
            Track your performance and growth.
          </p>

        </div>

      </div>

      {/* Stats Cards */}

      {/* Stats Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {/* Tests Taken */}

  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md flex flex-col items-center justify-center text-center">

    <p className="text-gray-500 text-lg">
      Tests Taken
    </p>

    <h2 className="text-5xl font-bold text-red-600 mt-4">
      {testsTaken}
    </h2>

  </div>

  {/* Accuracy */}

  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md flex flex-col items-center justify-center text-center">

    <p className="text-gray-500 text-lg">
      Accuracy
    </p>

    <h2 className="text-5xl font-bold text-green-500 mt-4">
      {avgAccuracy}%
    </h2>

  </div>

  {/* Best Score */}

  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md flex flex-col items-center justify-center text-center">

    <p className="text-gray-500 text-lg">
      Best Score
    </p>

    <h2 className="text-5xl font-bold text-purple-500 mt-4">
      {bestScore}
    </h2>

  </div>

  {/* Questions Solved */}

  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md flex flex-col items-center justify-center text-center">

    <p className="text-gray-500 text-lg">
      Questions Solved
    </p>

    <h2 className="text-5xl font-bold text-blue-500 mt-4">
      {totalCorrect}/{totalQuestions}
    </h2>

  </div>

</div>

      {/* Chart */}

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md mt-10">

        <h2 className="text-4xl font-bold text-slate-900 mb-8">
          Accuracy Trend
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={chartData}>

            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="5 5"
            />

            <XAxis
              dataKey="test"
              stroke="#64748b"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#64748b"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                color: "#000",
              }}
            />

            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#ef4444",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>
);
}