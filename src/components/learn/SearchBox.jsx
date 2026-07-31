import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { detectTopic } from "../../services/gemini";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await detectTopic(query);

      localStorage.setItem(
        "learningTopic",
        JSON.stringify(data)
      );
const recent = JSON.parse(
  localStorage.getItem("recentTopics") || "[]"
);

const updated = [
  query,
  ...recent.filter((item) => item !== query),
].slice(0, 10);

localStorage.setItem(
  "recentTopics",
  JSON.stringify(updated)
);
      navigate("/workspace");

    } catch (err) {
      console.error(err);
      alert("AI couldn't understand the topic.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-red-500" />
        <h2 className="text-2xl font-bold">
          AI Search
        </h2>
      </div>

      <div className="flex gap-4">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Example: Pointers, Photosynthesis, Trigonometry, AI, GST..."
          className="flex-1 h-14 px-6 rounded-2xl border border-slate-300 focus:border-red-500 outline-none"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-8 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Search"}
        </button>

      </div>

    </div>
  );
}