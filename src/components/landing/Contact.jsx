import React from 'react';
import { Mail, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-50 w-full px-8 xl:px-12 border-t border-slate-200">
      <div className="text-center mb-16">
        <span className="bg-red-50 text-[#ef4444] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-red-100">Contact Us</span>
        <h2 className="mt-6 text-5xl font-bold tracking-tight text-[#0f172a]">Get In Touch</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Mail />, title: "Email", info: "nirav.19.2006@gmail.com", color: "bg-blue-50 text-blue-500" },
          { icon: <Globe />, title: "Platform", info: "StudyFlux AI", color: "bg-red-50 text-[#ef4444]" },
          { icon: <FaGithub />, title: "Developer", info: "Nirav", color: "bg-slate-900 text-white" }
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm hover:scale-[1.02] transition-transform">
            <div className={`h-16 w-16 ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">{card.title}</h3>
            <p className="text-slate-500 font-medium break-all">{card.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
}