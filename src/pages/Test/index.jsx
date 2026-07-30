import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTestResult } from "../../api/testApi";
import { useAuth } from "../../context/AuthContext";
import { analyzePerformance } from "../../ai/analyzePerformance";
// src/pages/Test.jsx
import { 
  Timer, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Send,
  Code,
  PlusCircle // Added just in case
} from "lucide-react";

export default function Test() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Logic Preserved from original code
  const questions = JSON.parse(localStorage.getItem("generatedTest")) || [];
  const config = JSON.parse(localStorage.getItem("testConfig"));
  const examMode = config?.mode === "Exam";

  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState((config?.duration || 20) * 60);

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">No Test Generated</h1>
        <p className="text-slate-500 mt-2">Please go back and configure a new session.</p>
        <button 
          onClick={() => navigate("/create-test")}
          className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold transition-all active:scale-95"
        >
          Return to Config
        </button>
      </div>
    );
  }

  const question = questions[current] || {};

  // All logic functions preserved exactly
  function nextQuestion() {
    setShowExplanation(false);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitTest();
    }
  }

  async function submitTest() {
    if (submitted) return;
    setSubmitted(true);

    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const currentUser = user || JSON.parse(localStorage.getItem("user"));

if (!currentUser) {
  alert("Please login first.");
  navigate("/auth");
  return;
}

const result = {
  user_id: currentUser.id,
  language: config.language,
  difficulty: config.difficulty,
  duration: config.duration,
  total_questions: questions.length,
  score: score,
  percentage: Math.round((score / questions.length) * 100),
};

    const analysis = analyzePerformance(questions, answers);
    
    try {
      await saveTestResult(result);
      localStorage.setItem("testResult", JSON.stringify({
        ...result,
        answers,
        questions,
        analysis,
      }));
      navigate("/result");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Submission failed. Check console for details.");
      setSubmitted(false);
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      submitTest();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* TEST HEADER - STICKY */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.confirm("Quit test? Progress will be lost.") && navigate("/dashboard")}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Question {current + 1} <span className="text-slate-400">/ {questions.length}</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">{config?.language} • {question.topic}</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-colors ${
            timeLeft < 60 ? "bg-red-50 border-red-200 text-red-600" : "bg-slate-50 border-slate-100 text-slate-700"
          }`}>
            <Timer size={18} className={timeLeft < 60 ? "animate-pulse" : ""} />
            <span className="font-mono font-bold text-lg leading-none">
              {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
            </span>
          </div>
        </div>
        
        {/* Progress Bar Top */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-100">
          <div 
            className="h-full bg-red-500 transition-all duration-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      {/* MAIN TEST AREA */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Question Content */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0 font-bold border border-red-100">
                Q
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                {question.question}
              </h1>
            </div>

            {/* Code Context Area (Preserved style) */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-slate-100 rounded-2xl p-6 md:p-8 overflow-x-auto border border-slate-300 shadow-lg">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                  <Code size={16} className="text-red-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Source Snippet</span>
                </div>
                <pre className="text-slate-800 text-base md:text-lg leading-relaxed font-mono whitespace-pre-wrap italic">
                  {/* Note: Logic here handles the existing code string */}
                  {question.question_code || "// No code block for this question"}
                </pre>
              </div>
            </div>

            {/* Options List */}
            <div className="grid gap-3">
              {(question.options || []).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers((prev) => ({ ...prev, [current]: option }))}
                  className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group overflow-hidden ${
                    answers[current] === option
                      ? "bg-red-50 border-red-500 text-red-700 shadow-md shadow-red-100"
                      : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-colors ${
                      answers[current] === option ? "bg-red-500 border-red-500 text-white" : "border-slate-200 text-slate-400 group-hover:border-slate-400"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-semibold text-sm md:text-base">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* AI EXPLANATION - PRESERVED LOGIC */}
            {showExplanation && !examMode && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-3 text-emerald-700 mb-4">
                    <CheckCircle2 size={24} />
                    <h3 className="font-black tracking-tight text-lg uppercase">System Verification</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Correct Answer</p>
                      <p className="text-slate-900 font-bold">{question.answer}</p>
                    </div>
                    <div className="pt-4 border-t border-emerald-200/50">
                      <div className="flex items-center gap-2 text-[#ef4444] mb-2 font-bold text-xs uppercase tracking-widest">
                        <Sparkles size={14} /> AI Context
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER ACTIONS */}
      <footer className="bg-slate-50 border-t border-slate-200 px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {!examMode && (
              <button
                onClick={() => answers[current] ? setShowExplanation(true) : alert("Select an answer first")}
                disabled={showExplanation}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-7 text-base rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                <Info size={18} />
                Check Solution
              </button>
            )}
            <button
              onClick={() => window.confirm("Finish and submit now?") && submitTest()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-7 text-base rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
            >
              <Send size={18} />
              Submit Final
            </button>
          </div>

          <button
            onClick={nextQuestion}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-[#ef4444] text-white font-black text-base hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-100"
          >
            {current === questions.length - 1 ? "Finish Session" : "Next Question"}
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}