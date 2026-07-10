import { useState } from "react";
import { useNavigate } from "react-router-dom";
import programmingLanguages from "../../data/programmingLanguages";
import { showSuccess } from "../../utils/toast";
import { buildPrompt } from "../../ai/promptBuilder";
import { generateGeminiTest } from "../../services/geminiService";
import { parseGeminiResponse } from "../../ai/responseParser";
import { 
  Cpu, 
  Settings2, 
  Clock, 
  ListOrdered, 
  Code2, 
  Layers, 
  Zap, 
  Loader2, 
  Sparkles,
  Plus // Added this
} from "lucide-react";

export default function CreateTest() {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(programmingLanguages[0]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Practice");
  const [formats, setFormats] = useState(["MCQ"]);
  const [duration, setDuration] = useState(20);
  const [questions, setQuestions] = useState(20);

  const difficulties = ["Easy", "Medium", "Hard"];
  const modes = ["Practice", "Exam", "Revision"];
  const questionFormats = [
    "MCQ",
    "Code Output",
    "Find Error",
    "Fill Code",
    "Code Completion",
  ];

  const navigate = useNavigate();

  // Logic Functions Preserved
  function toggleTopic(topic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }

  function toggleFormat(format) {
    if (formats.includes(format)) {
      if (formats.length === 1) return;
      setFormats(formats.filter((f) => f !== format));
    } else {
      setFormats([...formats, format]);
    }
  }

  async function generateTest() {
    try {
      setLoading(true);
      const prompt = buildPrompt({
        language: language.name,
        topics: selectedTopics,
        difficulty,
        mode,
        formats,
        questions,
      });

      const response = await generateGeminiTest(prompt);
      const parsed = parseGeminiResponse(response);

      if (!parsed || !parsed.questions || !Array.isArray(parsed.questions)) {
        alert("AI returned invalid data.");
        return;
      }

      localStorage.setItem("testConfig", JSON.stringify({
        language: language.name,
        difficulty,
        mode,
        duration,
        questions,
        topics: selectedTopics,
      }));

      localStorage.setItem("generatedTest", JSON.stringify(parsed.questions));
      navigate("/test");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong while generating the AI test.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#ef4444] shadow-sm border border-red-100">
            <Sparkles size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configure Assessment</h1>
            <p className="text-slate-500 font-medium">Tailor your AI-powered coding challenge.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 w-full max-w-5xl mx-auto">
        {/* Left Column: Language & Topics */}
        <div className="space-y-8 w-full">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-slate-900 font-bold">
              <Code2 size={20} className="text-[#ef4444]" />
              <h2>Programming Environment</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
              {/* Language Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Language</label>
                <select
                  value={language.name}
                  onChange={(e) => setLanguage(programmingLanguages.find((l) => l.name === e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-semibold focus:ring-2 focus:ring-red-100 focus:border-[#ef4444] transition-all outline-none"
                >
                  {programmingLanguages.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>

              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Focus Area</label>
                <select
                  value={selectedTopics[0] || ""}
                  onChange={(e) => setSelectedTopics([e.target.value])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-semibold focus:ring-2 focus:ring-red-100 focus:border-[#ef4444] transition-all outline-none"
                >
                  <option value="">Full Curriculum</option>
                  {language.topics.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-slate-900 font-bold">
              <Layers size={20} className="text-[#ef4444]" />
              <h2>Test parameters</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Difficulty</label>
                <div className="flex flex-col gap-2">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        difficulty === d 
                        ? "bg-red-50 border-[#ef4444] text-[#ef4444]" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mode</label>
                <div className="flex flex-col gap-2">
                  {modes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        mode === m 
                        ? "bg-slate-900 border-slate-900 text-white" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Format</label>
                <select
                  value={formats[0]}
                  onChange={(e) => setFormats([e.target.value])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-semibold outline-none focus:border-[#ef4444]"
                >
                  {questionFormats.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-2 px-1 leading-tight">AI will prioritize this format during generation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Volume & Time */}
        <div className="space-y-8 w-full">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
              <Settings2 size={16} className="text-[#ef4444]" />
              <span>Session Limits</span>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                    <Clock size={16} /> Duration
                  </label>
                  <span className="text-2xl font-black text-[#ef4444]">{duration} <span className="text-xs text-slate-500">min</span></span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ef4444]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                    <ListOrdered size={16} /> Questions
                  </label>
                  <span className="text-2xl font-black text-[#ef4444]">{questions} <span className="text-xs text-slate-500">qty</span></span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={questions}
                  onChange={(e) => setQuestions(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ef4444]"
                />
              </div>
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="text-[#ef4444] font-bold">Estimated Load:</span> AI Gemini Flash-1.5 will generate a custom payload for {language.name} in approximately 3-5 seconds.
              </p>
            </div>
          </div>

          <button
            onClick={generateTest}
            disabled={loading}
            className={`w-full group relative overflow-hidden py-6 rounded-[2rem] text-lg font-black transition-all active:scale-95 shadow-xl ${
              loading 
              ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
              : "bg-[#ef4444] text-white hover:bg-red-600 shadow-red-200"
            }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Zap size={24} fill="currentColor" />
                  <span>Generate AI Test</span>
                </>
              )}
            </div>
            
            {/* Subtle button shine effect */}
            {!loading && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}