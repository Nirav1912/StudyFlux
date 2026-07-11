import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300">
      <nav className={`w-full px-8 xl:px-12 h-20 flex items-center justify-between transition-all ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200" : "bg-transparent"
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <img
  src="/icon-512.png"
  alt="StudyFlux"
  className="h-10 w-10 rounded-xl"
/>
          <span className="text-2xl font-bold tracking-tight text-[#0f172a]">StudyFlux</span>
        </Link>

      <div className="hidden lg:flex items-center gap-10">
  {[
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ].map((item) => (
   
  <a
    key={item.label}
    href={`#${item.id}`}
    className="text-sm font-bold text-slate-500 hover:text-[#ef4444] transition-colors uppercase tracking-wider"
  >
    {item.label}
  </a>
))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/auth" className="text-sm font-bold text-slate-600 hover:text-[#ef4444]">Login</Link>
          <Link to="/auth" className="bg-[#ef4444] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md">
            Get Started
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}