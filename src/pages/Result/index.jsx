import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  LayoutDashboard, 
  RefreshCcw,
  AlertTriangle,
  Zap,
  BookOpen
} from "lucide-react";

export default function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem("testResult"));
    setResult(savedResult);
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <RefreshCcw className="animate-spin text-red-500 mb-4" size={40} />
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Compiling Results...</h1>
      </div>
    );
  }

  const accuracy = Math.round((result.score / result.total) * 100);

  // Logic Function Preserved Exactly
  function getPerformance() {
    if (accuracy >= 90) {
      return {
        title: "Excellent",
        icon: <Trophy className="text-amber-500" size={32} />,
        badge: "🥇 Advanced Programmer",
        recommendation: "Excellent work! Try increasing the difficulty level for your next test.",
        color: "text-amber-600",
        bg: "bg-amber-50"
      };
    }
    if (accuracy >= 75) {
      return {
        title: "Good Job",
        icon: <Target className="text-blue-500" size={32} />,
        badge: "🥈 Intermediate Programmer",
        recommendation: "You're doing well. Review your weak topics and attempt another test.",
        color: "text-blue-600",
        bg: "bg-blue-50"
      };
    }
    if (accuracy >= 60) {
      return {
        title: "Keep Practicing",
        icon: <Zap className="text-emerald-500" size={32} />,
        badge: "🥉 Beginner Programmer",
        recommendation: "Practice more questions before increasing the difficulty.",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      };
    }
    return {
      title: "Needs Improvement",
      icon: <BookOpen className="text-red-500" size={32} />,
      badge: "🌱 Learner",
      recommendation: "Review the explanations carefully and practice the weak topics.",
      color: "text-red-600",
      bg: "bg-red-50"
    };
  }

  const performance = getPerformance();

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700 space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm uppercase tracking-widest mb-3">
            <CheckCircle2 size={16} />
            <span>Assessment Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Performance <span className="text-red-500">Report.</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <Link to="/create-test" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-100 active:scale-95 text-sm">
            <RefreshCcw size={18} />
            Retake Test
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all active:scale-95 text-sm">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>
      </div>

      {/* BENTO STATS GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Accuracy Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full border-8 border-slate-50 flex items-center justify-center relative mb-4">
              <div 
                className="absolute inset-0 rounded-full border-8 border-red-500 transition-all duration-1000"
                style={{ clipPath: `inset(${100 - accuracy}% 0 0 0)` }}
              ></div>
              <span className="text-3xl font-black text-slate-900">{accuracy}%</span>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Session Accuracy</p>
          </div>
        </div>

        {/* Score & Ranking Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 text-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-slate-400 font-medium text-sm mb-1">Final Score</p>
              <h2 className="text-5xl font-black tracking-tighter">
                {result.score} <span className="text-xl text-slate-500 font-normal">/ {result.total}</span>
              </h2>
            </div>
            <div className={`px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2`}>
              {performance.icon}
              <span className="font-bold text-sm tracking-tight">{performance.title}</span>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-col md:flex-row gap-6 md:items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Award className="text-red-500" size={24} />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Badge Earned</p>
                <p className="text-sm font-semibold">{performance.badge}</p>
              </div>
            </div>
            <div className="max-w-xs">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Sparkles size={10} /> AI Recommendation
              </p>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{performance.recommendation}"</p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* TOPIC ANALYSIS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Skill Proficiencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.analysis?.strongTopics?.length > 0 ? (
              result.analysis.strongTopics.map((topic) => (
                <span key={topic} className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                  {topic}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No specific proficiencies identified yet.</p>
            )}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Growth Opportunities
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.analysis?.weakTopics?.length > 0 ? (
              result.analysis.weakTopics.map((topic) => (
                <span key={topic} className="px-4 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                  {topic}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">Mastery achieved across all attempted topics! 🚀</p>
            )}
          </div>
        </div>
      </div>

      {/* QUESTION REVIEW SECTION */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen size={20} className="text-red-500" />
          Detailed Item Review
        </h2>
        
        <div className="space-y-4">
          {result.questions.map((q, index) => {
            const isCorrect = result.answers[index] === q.answer;
            return (
              <div key={index} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group hover:border-slate-300 transition-all">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Question {index + 1}</span>
                    {isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        <CheckCircle2 size={12} /> Correct
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        <XCircle size={12} /> Incorrect
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-6">
                    {q.question}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Your Choice</p>
                      <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                        {result.answers[index] || "Not Answered"}
                      </p>
                    </div>
                    {!isCorrect && (
                      <div className="p-4 rounded-2xl border bg-slate-50 border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Correct System Response</p>
                        <p className="text-sm font-semibold text-slate-700">{q.answer}</p>
                      </div>
                    )}
                  </div>

                  <details className="mt-6 group/details">
                    <summary className="list-none flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-500 hover:text-red-500 transition-colors">
                      <Sparkles size={16} className="text-red-500" />
                      View AI Breakdown
                      <ChevronRight size={16} className="group-open/details:rotate-90 transition-transform" />
                    </summary>
                    <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed italic">
                      {q.explanation}
                    </div>
                  </details>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL CALL TO ACTION */}
      <div className="rounded-[2rem] p-10 text-center">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Ready to evolve further?</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Based on your proficiency in {result.language}, we've curated a new set of challenges to target your weak spots.</p>
        <Link to="/create-test">
          <button className="px-10 py-4 rounded-2xl bg-[#ef4444] text-white font-black hover:bg-red-600 transition-all shadow-xl shadow-red-100 active:scale-95">
            Start Adaptive Session
          </button>
        </Link>
      </div>

    </div>
  );
}