import { Link } from "react-router-dom";
import { getUserResults } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { 
  Plus, TrendingUp, Trophy, BookOpen, Activity, 
  Sparkles, ChevronRight, Zap, History as HistoryIcon,
  Rocket, BarChart3, User, Clock, Target, AlertCircle
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await getUserResults(user.id);
        setResults(data || []);
      } catch (err) { console.error(err); }
    }
    load();
  }, [user]);

  const averageAccuracy = results.length ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0;
  const bestScore = results.length ? Math.max(...results.map(r => r.score)) : 0;
  const chartData = results.slice(0, 7).reverse().map((r, i) => ({ name: i, accuracy: r.accuracy }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
     <div className="bg-white border border-slate-200 rounded-[2rem] p-12 shadow-sm text-center flex flex-col items-center mb-10">

  <p className="text-sm text-red-500 font-bold uppercase tracking-[0.3em]">
  Welcome back
</p>

  <h1 className="text-5xl xl:text-6xl font-black mt-3 text-slate-900">
  Build Your Coding Skills 🚀
</h1>

  <p className="mt-4 text-slate-500 text-xl">
  Generate AI-powered coding tests and track your progress.
</p>

  <Link
  to="/create-test"
  className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition"
>
    <Rocket size={20} />
    Create New Test
  </Link>

</div> 
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          { label: "Completed", value: results.length, icon: BookOpen, color: "text-blue-500" },
          { label: "Average", value: `${averageAccuracy}%`, icon: Target, color: "text-emerald-500" },
          { label: "Best Score", value: bestScore, icon: Trophy, color: "text-purple-500" },
          { label: "Rank", value: "Elite", icon: Zap, color: "text-orange-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 min-h-[150px] shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-14 w-full mt-6">
  <div className="xl:col-span-9 space-y-10">

          {/* 2. QUICK ACTIONS TILES */}
          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: "Create Test", to: "/create-test", icon: Rocket, color: "bg-red-50 text-red-500" },
                 { label: "Progress", to: "/progress", icon: BarChart3, color: "bg-emerald-50 text-emerald-600" },
                 { label: "History", to: "/history", icon: Clock, color: "bg-purple-50 text-purple-600" },
                 { label: "Profile", to: "/profile", icon: User, color: "bg-blue-50 text-blue-600" },
               ].map((action, idx) => (
                 <Link key={idx} to={action.to} className="bg-white border border-slate-200 p-8 min-h-[170px] rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 hover:border-red-200 hover:shadow-lg transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <action.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{action.label}</span>
                 </Link>
               ))}
            </div>
          </section>

          {/* 3. RECENT TESTS LIST */}
          <section>
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Sessions</h3>
                <Link to="/history" className="text-[10px] font-bold text-red-500 hover:underline">View All History</Link>
             </div>
             <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                {results.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 text-sm">No sessions recorded.</div>
                ) : (
                  results.slice(0, 5).map((test) => (
                    <div key={test.id} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400">{test.language?.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{test.language}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{test.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</p>
                            <p className="text-sm font-black text-slate-900">{test.score}/{test.total}</p>
                         </div>
                         <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black">{test.accuracy}%</div>
                         <ChevronRight size={18} className="text-slate-300" />
                      </div>
                    </div>
                  ))
                )}
             </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="xl:col-span-3 flex flex-col gap-10 mt-8">
          {/* PERFORMANCE CHART */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm min-h-[170px] flex flex-col justify-center items-center text-center">
             <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Performance</h3>
             <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="accuracy" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* AI INSIGHTS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 min-h-[170px] shadow-sm flex flex-col justify-center">
             <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-6">
  <Sparkles size={14} fill="currentColor" />
  AI Insights
</div>
             <div className="space-y-6 h-full flex flex-col justify-center items-center text-center">
                <div className="flex flex-col items-center gap-3 text-center">
                   <div className="mt-1 p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp size={14}/></div>
                   <div>
                      <p className="text-sm font-bold text-slate-900">Keep practicing daily.</p>
                      <p className="text-xs text-slate-500 mt-1">Consistency is key to mastery.</p>
                   </div>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                   <div className="mt-1 p-2 bg-red-100 rounded-lg text-red-600"><AlertCircle size={14}/></div>
                   <div>
                      <p className="text-xs font-bold">Focus on weak topics.</p>
                      <p className="text-[10px] text-slate-400 mt-1">You're struggling with Array logic.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* WEAK TOPICS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm min-h-[120px] flex flex-col justify-center">
             <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">
  Weak Topics
</h3>
             <div className="flex flex-wrap gap-3 items-center justify-center">
                {["Pointers", "Recursion", "Memory", "Loops"].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase border border-red-100">{t}</span>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}