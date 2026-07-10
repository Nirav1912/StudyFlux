import { useEffect, useMemo, useState } from "react";
import { getUserResults } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";

export default function History() {
  const { user } = useAuth();

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;

      try {
        const data = await getUserResults(user.id);
        setResults(data || []);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [user]);

  const filteredResults = useMemo(() => {
    return results.filter((test) =>
      "AI Programming Test"
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [results, search]);

  const totalTests = results.length;

  const averageAccuracy =
    results.length > 0
      ? Math.round(
          results.reduce((sum, test) => sum + test.accuracy, 0) /
            results.length
        )
      : 0;

  const bestScore =
    results.length > 0
      ? Math.max(...results.map((t) => t.score))
      : 0;

  function getColor(accuracy) {
    if (accuracy >= 90) return "text-green-400";
    if (accuracy >= 70) return "text-yellow-400";
    return "text-red-400";
  }

  return (
 <div className="min-h-screen w-full bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] px-8 pt-36 pb-40">

    {/* Background */}

    <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-red-100 opacity-50 blur-[180px] rounded-full"></div>

    <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-pink-100 opacity-50 blur-[180px] rounded-full"></div>

    <div className="relative w-full bg-white rounded-[32px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">

      {/* Header */}

      <div className="flex items-center gap-6 mb-10">

        <div className="w-24 h-24 rounded-[28px] bg-red-50 flex items-center justify-center text-6xl">
          📜
        </div>

        <div>

          <h1 className="text-7xl font-black text-slate-900">
            Test History
          </h1>

          <p className="text-2xl text-gray-500 mt-2">
            Review all your completed AI tests.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-8 text-center">

          <h2 className="text-gray-500 text-lg">
            Total Tests
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-3">
            {totalTests}
          </p>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-8 text-center">

          <h2 className="text-gray-500 text-lg">
            Average Accuracy
          </h2>

          <p className="text-5xl font-bold text-green-500 mt-3">
            {averageAccuracy}%
          </p>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-8 text-center">

          <h2 className="text-gray-500 text-lg">
            Best Score
          </h2>

          <p className="text-5xl font-bold text-purple-500 mt-3">
            {bestScore}
          </p>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search tests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-5 rounded-2xl border border-gray-300 bg-gray-50 text-slate-900 outline-none focus:border-red-500 mb-8"
      />

      {/* History List */}

      {filteredResults.length === 0 ? (

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center">

          <h2 className="text-3xl font-bold text-slate-900">
            No Tests Found
          </h2>

          <p className="text-gray-500 mt-3">
            Complete your first AI test to see it here.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {filteredResults.map((test) => (

            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md flex justify-between items-center hover:shadow-lg transition"
            >

              <div>

               <h2 className="text-3xl font-bold text-slate-900">
  {test.language || "AI Programming"} Test
</h2>

                <p className="text-gray-500 mt-3">
                  📅{" "}
                  {test.completed_at
                    ? new Date(
                        test.completed_at
                      ).toLocaleString()
                    : "No Date"}
                </p>

              </div>

              <div className="text-right">

                <p className="text-4xl font-bold text-blue-500">
                  {test.score}/{test.total}
                </p>

                <p
                  className={`text-xl font-semibold ${getColor(
                    test.accuracy
                  )}`}
                >
                  {test.accuracy}% Accuracy
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}