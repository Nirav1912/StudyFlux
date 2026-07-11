import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Smartphone, CheckCircle2, Zap } from "lucide-react";
import logo from "../../assets/logo.png";
import usePWAInstall from "../../hooks/usePWAInstall";
import { useAuth } from "../../context/AuthContext";

// SAFEGUARDS: If hooks fail, the component won't crash
export default function Hero() {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  
  // Dummy data if context is missing
  const { user } = useAuth();
const { install } = usePWAInstall();
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-12 grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-100 mb-8">
            <Sparkles className="w-4 h-4 text-[#ef4444]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ef4444]">AI Powered Programming Learning</span>
          </div>

          <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-[#0f172a] leading-[0.95] mb-8">
            Master <br /> Programming <br />
            <span className="text-[#ef4444]">with AI</span>
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed max-w-xl mb-12">
            Create intelligent tests, discover weak topics, receive AI explanations, and track your growth on a modern, high-performance platform.
          </p>
{/* Floating Quick Access Box */}

<div className="mb-10 w-full max-w-[650px]">
  <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl">

  <h3 className="text-lg font-bold text-slate-900 mb-5 text-center">
    Quick Start
  </h3>

    <div className="grid grid-cols-3 gap-4">

  {/* Dashboard */}

  <Link to={user ? "/dashboard" : "/auth"} className="w-full">
    <button className="h-32 w-full bg-slate-50 border border-slate-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all flex flex-col items-center justify-center">
      <p className="text-2xl mb-2">🚀</p>
      <p className="font-bold text-sm">
        {user ? "Dashboard" : "Let's Start"}
      </p>
      <p className="text-xs text-slate-500 mt-1">
        (Dashboard)
      </p>
    </button>
  </Link>

  {/* Install */}

  <button
    onClick={async () => {
      const installed = await install();

      if (!installed) {
        setShowInstallGuide(true);
      }
    }}
    className="h-32 w-full bg-slate-50 border border-slate-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all flex flex-col items-center justify-center"
  >
    <p className="text-2xl mb-2">📲</p>
    <p className="font-bold text-sm">Install App</p>
    <p className="text-xs text-slate-500 mt-1">(PWA)</p>
  </button>

  {/* Create Test */}

  <Link to={user ? "/create-test" : "/auth"} className="w-full">
    <button className="h-32 w-full bg-slate-50 border border-slate-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all flex flex-col items-center justify-center">
      <p className="text-2xl mb-2">✨</p>
      <p className="font-bold text-sm">Create Test</p>
      <p className="text-xs text-slate-500 mt-1">(AI Test)</p>
    </button>
  </Link>

</div>

  </div>
</div>
          
        </motion.div>

        {/* Right Card UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex justify-center w-full"
        >
          <div className="w-full max-w-[560px] bg-white border border-slate-200 rounded-[3rem] p-10 shadow-2xl relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <img
  src="/icon-512.png"
  alt="StudyFlux"
  className="h-14 w-14 rounded-2xl object-cover"
/>
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a]">StudyFlux</h3>
                <p className="text-slate-400 font-medium text-sm">Session Configurator</p>
              </div>
            </div>

            <div className="space-y-5">
              {['Python', 'Advanced', '20 Questions'].map((val, i) => (
                <div key={i} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700">
                  {val}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {['AI Generated Questions', 'Detailed Explanations', 'Weak Topic Analysis'].map(feat => (
                <div key={feat} className="flex items-center gap-2 text-sm font-bold text-green-600">
                  <CheckCircle2 className="w-4 h-4" /> {feat}
                </div>
              ))}
            </div>

            <Link
  to={user ? "/create-test" : "/auth"}
  className="block mt-8"
>
              <button className="w-full py-5 rounded-[2rem] bg-[#ef4444] text-white font-bold text-lg shadow-lg hover:bg-red-600 transition-all">
                Generate AI Test
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {showInstallGuide && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Install App</h2>
            <p className="text-slate-500 mb-8">Open your browser menu and select "Add to Home Screen" to install StudyFlux.</p>
            <button onClick={() => setShowInstallGuide(false)} className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold">
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}