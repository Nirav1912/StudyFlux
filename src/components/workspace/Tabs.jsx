const tabs = [
  "Learn",
  "AI Test",
  "PYQ",
  "Notes",
  "Flashcards",
  "Mind Map",
  "Ask AI",
];

export default function Tabs({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            active === tab
              ? "bg-red-500 text-white"
              : "bg-white border border-slate-200 hover:border-red-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}