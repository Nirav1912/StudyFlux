import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "Is StudyFlux free to use?",
    a: "Yes. You can create an account and start learning for free."
  },
  {
    q: "Which programming languages are supported?",
    a: "Currently C, C++, Java, Python, JavaScript and more are being added."
  },
  {
    q: "How are AI tests generated?",
    a: "StudyFlux uses Google's Gemini AI to generate unique questions based on your selected language and difficulty."
  },
  {
    q: "Can I track my progress?",
    a: "Yes. Every completed test is stored and visualized in your Progress dashboard."
  },
  {
    q: "Can I use StudyFlux on my phone?",
    a: "Yes. StudyFlux is being built as a Progressive Web App (PWA), so you can install it on mobile and desktop."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-28 bg-gray-50">

      <div className="max-w-5xl mx-auto px-40 lg:translate-x-63">

        <div className="text-center">

          <span className="text-red-700 font-bold uppercase tracking-widest">
            FAQ
          </span>

          <h2 className="text-5xl font-black mt-5">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-500 text-xl">
            Everything you need to know about StudyFlux.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((item, index) => (

            <div
              key={item.q}
              className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden"
            >

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <h3 className="font-semibold text-lg">
                  {item.q}
                </h3>

                <FaChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (

                <div className="px-6 pb-6 text-gray-600 leading-7">
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