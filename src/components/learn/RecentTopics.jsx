export default function RecentTopics() {
  const history = JSON.parse(
    localStorage.getItem("recentTopics") || "[]"
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Recent Searches
      </h2>

      {history.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-slate-400 text-center">
          No recent searches yet.
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {history.map((topic, index) => (
            <div
              key={index}
              className="px-5 py-3 rounded-2xl bg-white border border-slate-200"
            >
              {topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}