import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserResults } from "../../api/testApi";
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target, 
  Zap, 
  Calendar,
  ChevronRight,
  Clock // Added missing import
} from "lucide-react";

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
  const chartData = results
    .slice()
    .reverse()
    .map((item, index) => ({
      test: `Test ${index + 1}`,
      accuracy: item.accuracy,
    }));

  const testsTaken = results.length;
  const avgAccuracy = testsTaken > 0
    ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / testsTaken)
    : 0;
  const bestScore = testsTaken > 0
    ? Math.max(...results.map((r) => r.score))
    : 0;
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
  const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#ef4444] border border-red-100">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Performance <span className="text-[#ef4444]">Insights</span></h1>
            <p className="text-slate-500 font-medium text-sm">Detailed breakdown of your cognitive evolution.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <Calendar size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Life Time Data</span>
        </div>
      </div>

      {/* STATS BENTO GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Tests Taken", value: testsTaken, icon: Zap, color: "text-slate-900" },
          { label: "Avg. Accuracy", value: `${avgAccuracy}%`, icon: Target, color: "text-[#ef4444]" },
          { label: "Best Score", value: bestScore, icon: Trophy, color: "text-amber-500" },
          { label: "Success Rate", value: `${totalCorrect}/${totalQuestions}`, icon: TrendingUp, color: "text-emerald-500" },
        ].map((stat, idx) => (
          <div
  key={idx}
  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-[#ef4444]/30 transition-all group flex flex-col items-center justify-center text-center"
>
            <div className="flex items-center justify-center mb-4">
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-red-50 transition-colors">
                <stat.icon size={18} className="text-slate-400 group-hover:text-[#ef4444]" />
              </div>
              
            </div>
            <h3 className={`text-4xl font-black ${stat.color} tracking-tighter`}>
              {stat.value}
            </h3>
            <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-[0.15em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ANALYTICS CHART SECTION */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart Tile */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex flex-col items-center text-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Accuracy Trend</h2>
              <p className="text-xs text-slate-400 font-medium">Session-by-session growth mapping</p>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
  Accuracy
</p>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid
                  stroke="#f1f5f9"
                  strokeDasharray="0"
                  vertical={false}
                />
                <XAxis
                  dataKey="test"
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                />
                <Tooltip
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0f172a"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#ffffff",
                    stroke: "#ef4444",
                    strokeWidth: 2
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#ef4444",
                    stroke: "#ffffff",
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Recommendations Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col shadow-sm text-center">
           <div className="flex flex-col items-center justify-center gap-3 mb-8">
            <TrendingUp size={20} className="text-[#ef4444]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Growth Plan</h2>
           </div>
           
           <div className="space-y-10 flex-1">
             <div className="flex flex-col items-center gap-3">
               <p className="text-xs font-bold text-red-500 mb-1 italic">Phase 1</p>
               <h4 className="text-sm font-semibold mb-1">Consistency Check</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                 You have completed {testsTaken} tests. Aim for 10 sessions to unlock deep learning metrics.
               </p>
             </div>

             <div className="flex flex-col items-center gap-3">
               <p className="text-xs font-bold text-red-500 mb-1 italic">Phase 2</p>
               <h4 className="text-sm font-semibold mb-1">Accuracy Target</h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Current average is {avgAccuracy}%. Push for 85% to reach 'Elite' rank status.
               </p>
             </div>
           </div>

          <div className="mt-8 pt-8 border-t border-slate-200 w-full text-center">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <span>Progress Score</span>
                <span className="text-[#ef4444]">{avgAccuracy}/100</span>
             </div>
             <div className="mt-3 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
               <div 
                className="h-full bg-[#ef4444] transition-all duration-1000" 
                style={{ width: `${avgAccuracy}%` }}
               ></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}