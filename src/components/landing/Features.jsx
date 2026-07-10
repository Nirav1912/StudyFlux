import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaChartLine,
  FaBrain,
  FaLightbulb,
  FaLaptopCode,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Test Generation",
    tag: "Powered by Gemini",
    description:
      "Generate personalized programming tests based on your selected language and difficulty level using AI.",
  },
  {
    icon: <FaChartLine />,
    title: "Progress Tracking",
    tag: "Learning Analytics",
    description:
      "Track completed tests, monitor scores, and measure your programming improvement over time.",
  },
  {
    icon: <FaBrain />,
    title: "Weak Topic Detection",
    tag: "AI Insights",
    description:
      "Identify concepts that need more practice based on your previous test performance.",
  },
  {
    icon: <FaLightbulb />,
    title: "AI Explanations",
    tag: "Learn Faster",
    description:
      "Receive clear AI-generated explanations for every question after completing your test.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Multiple Languages",
    tag: "Programming",
    description:
      "Practice C, C++, Java, Python, JavaScript and more as additional languages are added.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Progressive Web App",
    tag: "Install Anywhere",
    description:
      "Install StudyFlux on desktop or mobile for a fast, app-like learning experience.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-red-50/20 to-gray-50"
    >
      {/* Background Glow */}

      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-red-200/20 rounded-full blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-[200px]" />

      <div className="relative max-w-[1400px] mx-auto pl-20 pr-8 lg:pl-32 lg:pr-12">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto lg:translate-x-100"
        >
          <p className="uppercase tracking-[6px] text-red-600 font-bold">
            WHY STUDYFLUX
          </p>

          <h2 className="mt-5 text-3xl md:text-3xl lg:text-[52px] font-black text-gray-900 leading-[1.15]">
  Everything you need
  <br />
  to become a better programmer
</h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-500 leading-8">
  StudyFlux combines AI-powered test generation, personalized
  explanations, progress analytics, and adaptive learning into one
  modern platform.
</p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 lg:translate-x-14">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden min-h-[220px] rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(239,68,68,.18)]"
            >
              {/* Number */}

              <span className="absolute top-6 right-6 text-5xl font-black text-gray-200">
                0{index + 1}
              </span>

              {/* Icon */}

              <div className="w-14 h-14 text-xl rounded-2xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-red-700 text-3xl shadow-md">
                {feature.icon}
              </div>

              {/* Tag */}

              <span className="inline-block mt-8 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                {feature.tag}
              </span>

              {/* Title */}

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}

              <p className="mt-5 text-gray-600 text-[15px] leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}

        <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-32 lg:translate-x-15"
>
          <div className="rounded-[36px] bg-white/70 backdrop-blur-2xl border border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-14 text-center">

            <h3 className="text-3xl font-black text-gray-900">
              Ready to improve your programming skills?
            </h3>

            <p className="mt-5 text-xl text-gray-500">
              Start learning with AI-powered programming tests and personalized
              feedback.
            </p>

            <Link to="/create-test">
  <button className="mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white text-lg font-bold shadow-xl hover:scale-105 transition-all">
    Start Learning →
  </button>
</Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
}