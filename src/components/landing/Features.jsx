import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bot, 
  LineChart, 
  BrainCircuit, 
  Zap, 
  Terminal, 
  Smartphone,
  ArrowRight
} from "lucide-react";

const features = [
  { icon: <Bot />, title: "AI Test Generation", tag: "Gemini Pro", desc: "Generate personalized programming tests based on your selected language and level." },
  { icon: <LineChart />, title: "Analytics", tag: "Live Stats", desc: "Track tests, monitor scores, and measure your improvement over time with visual data." },
  { icon: <BrainCircuit />, title: "Weak Topics", tag: "AI Insights", desc: "Automatically identify concepts that need more practice based on performance." },
  { icon: <Zap />, title: "AI Explanations", tag: "Learn Faster", desc: "Receive crystal clear AI-generated explanations for every question instantly." },
  { icon: <Terminal />, title: "Multi-Language", tag: "Coding", desc: "Practice C, C++, Java, Python, and JavaScript with more being added monthly." },
  { icon: <Smartphone />, title: "PWA Experience", tag: "App Mode", desc: "Install StudyFlux on any device for a fast, desktop or mobile app experience." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white w-full">
      <div className="w-full max-w-7xl mx-auto px-8 xl:px-12">

  <div className="flex flex-col items-center justify-center text-center mb-20">

    <span className="text-[#ef4444] font-bold uppercase tracking-[0.3em] text-xs">
      Features
    </span>

    <h2 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a]">
      Become a better programmer
    </h2>

    <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-3xl">
      StudyFlux combines AI-powered generation and personalized analytics into one modern platform.
    </p>

  </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  {features.map((f, i) => (
    <motion.div
      key={f.title}
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm hover:border-red-200 transition-all flex flex-col items-center text-center group"
    >
      <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#ef4444] mb-8 border border-slate-100 group-hover:scale-110 transition-transform">
        {f.icon}
      </div>

      <span className="text-[10px] font-black uppercase tracking-widest text-[#ef4444] bg-red-50 px-3 py-1 rounded-full mb-4">
        {f.tag}
      </span>

      <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
        {f.title}
      </h3>

      <p className="text-slate-500 leading-relaxed">
        {f.desc}
      </p>
    </motion.div>
  ))}
</div>

</div>

</section>
  );
}