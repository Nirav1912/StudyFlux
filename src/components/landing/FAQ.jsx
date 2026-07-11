import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is StudyFlux free to use?",
    a: "Yes. You can create an account and start learning for free.",
  },
  {
    q: "Which programming languages are supported?",
    a: "Currently C, C++, Java, Python, JavaScript and more are being added daily.",
  },
  {
    q: "How are AI tests generated?",
    a: "StudyFlux uses Google's Gemini AI to generate unique questions based on your specific level.",
  },
  {
    q: "Can I track my progress?",
    a: "Yes. Every completed test is stored and visualized in your Progress dashboard.",
  },
  {
    q: "Can I use StudyFlux on my phone?",
    a: "Yes. StudyFlux is a PWA, meaning you can install it on mobile for a native app feel.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="min-h-screen flex items-center bg-white w-full">

      <div className="max-w-5xl mx-auto px-8 flex flex-col items-center">

        {/* Heading */}

        <div className="text-center mb-16 flex flex-col items-center">

          <HelpCircle className="w-10 h-10 text-slate-300 mb-4" />

          <span className="text-[#ef4444] font-bold uppercase tracking-[0.3em] text-xs">
            FAQ
          </span>

          <h2 className="mt-4 text-5xl md:text-6xl font-bold text-[#0f172a]">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-xl text-slate-500 max-w-2xl">
            Everything you need to know about StudyFlux.
          </p>

        </div>

        {/* FAQ Cards */}

        <div className="space-y-5 w-full">

          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-red-200 transition-all"
            >
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full p-8 flex items-center justify-between"
              >
                <h3 className="flex-1 text-center font-bold text-xl text-[#0f172a]">
                  {item.q}
                </h3>

                <ChevronDown
                  className={`text-slate-400 transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-8 pb-8 text-center text-slate-500 text-lg leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}