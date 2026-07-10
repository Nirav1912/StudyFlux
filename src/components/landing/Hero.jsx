import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import usePWAInstall from "../../hooks/usePWAInstall";


export default function Hero() {
const { canInstall, install } = usePWAInstall();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/40 to-white">
        {/* Background Blobs */}

{/* Background Glows */}

<div className="absolute -top-24 -left-40 w-[900px] h-[900px] rounded-full bg-red-200/12 blur-[250px]"></div>

<div className="absolute top-0 -right-36 w-[850px] h-[850px] rounded-full bg-pink-200/12 blur-[250px]"></div>

<div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] rounded-full bg-orange-100/18 blur-[300px]"></div>
      <div className="max-w-[1650px] mx-auto px-8 lg:px-12 min-h-screen flex items-center justify-center pt-36 pb-20">

  <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">

        {/* LEFT */}

        <motion.div
  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full lg:w-1/2 max-w-[540px] ml-10 lg:ml-32"
>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">

            🚀 AI Powered Programming Learning

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-black">

            Master

            <br />

            Programming

            <br />

            <span className="text-red-700">

              with AI

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-gray-600 leading-9">

            Create intelligent programming tests,
            discover weak topics,
            receive AI explanations,
            and improve every day.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

  <Link
    to="/auth"
    className="px-8 py-4 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-semibold shadow-xl transition-all hover:-translate-y-1"
  >
    🚀 Start Learning
  </Link>

  <button
  onClick={install}
  disabled={!canInstall}
  className="
    px-8 py-4 rounded-2xl bg-white border border-gray-300
    hover:border-red-600 hover:text-red-700
    font-semibold transition-all hover:-translate-y-1 shadow-sm
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  📲 {canInstall ? "Install App" : "Already Installed"}
</button>

</div>

          <div className="flex items-center gap-6 mt-12">

            

            <span className="text-gray-600">

              <div className="flex flex-wrap gap-4 mt-12">

  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
    🤖 Google Gemini AI
  </span>

  <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
    📱 Progressive Web App
  </span>

  <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium">
    💻 Multiple Programming Languages
  </span>

</div>

            </span>

          </div>

        </motion.div>

        {/* RIGHT */}

        {/* RIGHT */}

<motion.div
  initial={{ opacity: 0, x: 80 }}
  animate={{
    opacity: 1,
    x: 0,
    y: [0, -10, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    x: { duration: 0.8 },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="w-full lg:w-1/2 flex justify-end lg:pr-24"
>
  <div className="w-full max-w-[600px] bg-white/55 backdrop-blur-3xl rounded-[38px] border border-white/80 shadow-[0_25px_70px_rgba(255,80,80,0.10)] p-10">

    {/* Header */}

    <div className="flex items-center gap-4 mb-8">

      <img
        src={logo}
        alt="StudyFlux"
        className="w-14 h-14 rounded-xl"
      />

      <div>
        <h3 className="text-3xl font-bold text-black">
          StudyFlux
        </h3>

        <p className="text-gray-500">
          Create Your AI Test
        </p>
      </div>

    </div>

    {/* Form Preview */}

    <div className="space-y-5">

      <div>
        <label className="text-sm text-gray-500">
          Programming Language
        </label>

        <div className="mt-2 rounded-xl border border-gray-200 p-4 bg-white">
          Python
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Difficulty
        </label>

        <div className="mt-2 rounded-xl border border-gray-200 p-4 bg-white">
          Medium
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Questions
        </label>

        <div className="mt-2 rounded-xl border border-gray-200 p-4 bg-white">
          20 Questions
        </div>
      </div>

    </div>

    {/* Features */}

    <div className="mt-8 space-y-3">

      <p className="text-green-600 font-medium">
        ✅ AI Generated Questions
      </p>

      <p className="text-green-600 font-medium">
        ✅ Detailed AI Explanations
      </p>

      <p className="text-green-600 font-medium">
        ✅ Weak Topic Analysis
      </p>

    </div>

    {/* Button */}

    <Link to="/create-test">
  <button
    className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white font-bold shadow-lg hover:scale-[1.02] transition"
  >
    Generate AI Test
  </button>
</Link>

  </div>
</motion.div>

      </div>
</div>
    </section>
  );
}