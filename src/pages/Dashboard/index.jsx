import { Link } from "react-router-dom";
import { getUserResults } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [results, setResults] = useState([]);
const { user } = useAuth();


useEffect(() => {
  async function load() {
    try {
      if (!user) return;

      console.log("Current User:", user);

      const data = await getUserResults(user.id);

      console.log("Dashboard Data:", data);

      setResults(data);
    } catch (err) {
      console.error(err);
    }
  }

  load();
}, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] text-slate-900">

      {/* Navbar */}

      

      <div className="w-full px-10 pt-36 pb-40">
<div className="flex justify-end mb-6">

  <p className="text-slate-400">
    Welcome 👋
  </p>

</div>
        {/* Hero */}

        <div className="mt-10 bg-white rounded-[32px] p-10 border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col items-center text-center">

          <h2 className="text-4xl font-bold">

            Ready to Improve?

          </h2>

          <p className="mt-3 text-gray-500">

            AI will generate your next programming test.

          </p>

          <Link to="/create-test" className="mt-8">
  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl font-bold hover:scale-105 transition">
    Create New Test
  </button>
</Link>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-4 gap-6 mt-8">

  {/* Tests Completed */}

  <div className="bg-white rounded-3xl h-40 p-6 border border-gray-200 shadow-md flex flex-col items-center justify-center text-center">
    <h3 className="text-5xl font-extrabold text-blue-500">
      {results.length}
    </h3>

    <p className="text-slate-400 mt-2">
      Tests Completed
    </p>
  </div>

  {/* Average Accuracy */}

  <div className="bg-white rounded-3xl h-40 p-6 border border-gray-200 shadow-md flex flex-col items-center justify-center text-center">
    <h3 className="text-5xl font-extrabold text-green-400">
      {results.length
        ? Math.round(
            results.reduce((a, b) => a + b.accuracy, 0) /
              results.length
          )
        : 0}
      %
    </h3>

    <p className="text-slate-400 mt-2">
      Average Accuracy
    </p>
  </div>

  {/* Best Score */}

  <div className="bg-white rounded-3xl h-40 p-6 border border-gray-200 shadow-md flex flex-col items-center justify-center text-center">
    <h3 className="text-5xl font-extrabold text-purple-400">
      {results.length
        ? Math.max(...results.map((r) => r.score))
        : 0}
    </h3>

    <p className="text-slate-400 mt-2">
      Best Score
    </p>
  </div>

  {/* Latest Accuracy */}

  <div className="bg-white rounded-3xl h-40 p-6 border border-gray-200 shadow-md flex flex-col items-center justify-center text-center">
    <h3 className="text-5xl font-extrabold text-cyan-400">
      {results[0]?.accuracy || 0}%
    </h3>

    <p className="text-slate-400 mt-2">
      Last Test
    </p>
  </div>

</div>
<div className="mt-10">

  <h2 className="text-3xl font-bold mb-5 text-center">
    ⚡ Quick Actions
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    <Link
      to="/create-test"
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 rounded-3xl h-28 flex flex-col items-center justify-center transition-all shadow-lg"
    >
      <h3 className="text-2xl mb-2">🚀</h3>
      <p className="font-bold">Create Test</p>
    </Link>

    <Link
      to="/progress"
     className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 rounded-3xl h-28 flex flex-col items-center justify-center transition-all shadow-lg"
    >
      <h3 className="text-2xl mb-2">📈</h3>
      <p className="font-bold">Progress</p>
    </Link>

    <Link
      to="/history"
      className="bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:scale-105 rounded-3xl h-28 flex flex-col items-center justify-center transition-all shadow-lg"
    >
      <h3 className="text-2xl mb-2">📜</h3>
      <p className="font-bold">History</p>
    </Link>

    <Link
      to="/profile"
      className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:scale-105 rounded-3xl h-28 flex flex-col items-center justify-center transition-all shadow-lg"
    >
      <h3 className="text-2xl mb-2">👤</h3>
      <p className="font-bold">Profile</p>
    </Link>

  </div>

</div>
        {/* Recent Tests */}

                {/* Recent Tests */}

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Recent Tests
          </h2>

          <div className="space-y-4">

            {results.length === 0 && (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 text-center">
                No tests completed yet.
              </div>
            )}

            {results.map((test) => (
              <div
  key={test.id}
  className="bg-white rounded-3xl border border-gray-200 shadow-md py-6 px-16 flex items-center justify-center"
>
  <div className="flex justify-between items-center w-[90%]">

  <div className="text-left">
    <h3 className="font-bold text-xl">
      {test.language}
    </h3>

    <p className="text-slate-400">
      {test.difficulty} •{" "}
      {new Date(test.completed_at).toLocaleDateString()}
    </p>
  </div>

  <div className="text-right">
    <p className="text-green-500 text-2xl font-bold">
      {test.score}/{test.total}
    </p>

    <p className="text-blue-500">
      {test.accuracy}%
    </p>
  </div>

</div>
</div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}