import React from 'react';
import { Globe, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-white text-[#0f172a] py-16 border-t border-slate-200 w-full px-8 xl:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <Zap className="text-white w-6 h-6 fill-current" />
          <span className="text-2xl font-bold tracking-tight">StudyFlux</span>
        </div>
        
        <div className="flex gap-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <a href="#features" className="hover:text-[#ef4444] transition-colors">Features</a>
          <a href="#how" className="hover:text-[#ef4444] transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-[#ef4444] transition-colors">FAQ</a>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-slate-900 text-sm">Built by Nirav</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">© 2024 StudyFlux AI</p>
        </div>
      </div>
    </footer>
  );
}