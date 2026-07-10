import { useEffect, useMemo, useState } from "react";
import { getUserResults } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";
import { 
  History as HistoryIcon, 
  Search, 
  Calendar, 
  ChevronRight, 
  Trophy, 
  Target, 
  Zap, 
  Clock,
  Filter,
  Code
} from "lucide-react";

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

  // Logic Preserved Exactly
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

  // Class names updated to more modern shades, logic preserved
  function getColor(accuracy) {
    if (accuracy >= 90) return "text-emerald-500";
    if (accuracy >= 70) return "text-amber-500";
    return "text-red-500";
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#ef4444] border border-red-100">
            <HistoryIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Test <span className="text-[#ef4444]">History</span></h1>
            <p className="text-slate-500 font-medium">Review and analyze your past performance.</p>
          </div>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sessions", value: totalTests, icon: Zap, color: "text-slate-900" },
          { label: "Avg. Accuracy", value: `${averageAccuracy}%`, icon: Target, color: "text-emerald-500" },
          { label: "Personal Best", value: `${bestScore} pts`, icon: Trophy, color: "text-amber-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-red-100 transition-all">
            <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-red-50 transition-colors">
              <stat.icon size={22} className="text-slate-400 group-hover:text-red-500" />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h3 className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search test history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-slate-900 font-medium focus:ring-4 focus:ring-red-50/50 focus:border-red-400 transition-all outline-none"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
          <Filter size={18} />
          Advanced Filters
        </button>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        {filteredResults.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-16 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
              <HistoryIcon size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">No records found</h2>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">Try adjusting your search or complete a new AI test to populate your history.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredResults.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between hover:border-red-200 hover:shadow-md hover:shadow-red-50/50 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors border border-slate-100 uppercase font-black text-xs">
                    {test.language?.charAt(0) || <Code size={20} />}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                      {test.language || "AI Programming"} Session
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                        <Calendar size={12} className="text-slate-300" />
                        {test.completed_at ? new Date(test.completed_at).toLocaleDateString() : "N/A"}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                        <Clock size={12} className="text-slate-300" />
                        {test.completed_at ? new Date(test.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-10 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                  <div className="text-left md:text-right">
                    <p className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                      {test.score} <span className="text-xs text-slate-400 font-normal">/ {test.total}</span>
                    </p>
                    <p className={`text-xs font-black uppercase mt-1 tracking-widest ${getColor(test.accuracy)}`}>
                      {test.accuracy}% Accuracy
                    </p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all group-hover:translate-x-1">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}