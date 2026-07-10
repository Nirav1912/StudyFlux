import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaMagic,
  FaLaptopCode,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Create Your Account",
    description:
      "Sign up or log in to access your personalized programming learning dashboard.",
  },
  {
    icon: <FaMagic />,
    title: "Generate an AI Test",
    description:
      "Choose your programming language, difficulty level, and number of questions.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Complete the Test",
    description:
      "Answer AI-generated programming questions designed for your selected level.",
  },
  {
    icon: <FaBrain />,
    title: "Receive AI Analysis",
    description:
      "View your score, explanations, and weak topics after completing the test.",
  },
  {
    icon: <FaChartLine />,
    title: "Track Your Progress",
    description:
      "Review previous tests and monitor your improvement over time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-32 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto lg:translate-x-100">

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
            Simple Workflow
          </span>

          <h2 className="mt-6 text-5xl font-black">
            How StudyFlux Works
          </h2>

          <p className="mt-6 text-xl text-gray-500">
            StudyFlux guides you from creating a test to improving your
            programming skills with AI-powered insights.
          </p>

        </div>

        <div className="mt-24 relative max-w-[1200px] mx-auto">

          {/* Vertical Line */}

          <div className="absolute left-[65%] top-0 bottom-0 w-1 bg-red-100 hidden lg:block -translate-x-1/2"></div>

          <div className="space-y-14">

            {steps.map((step, index) => (

              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex items-center ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                } flex-col gap-10`}
              >

                {/* Card */}

                <div
  className={`lg:w-5/12 bg-white border border-gray-200 rounded-3xl shadow-xl p-8 transition-all duration-300 ${
    index % 2 === 0
      ? "lg:translate-x-34"
      : "lg:translate-x-52"
  }`}
>

  <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-700 text-3xl">
    {step.icon}
  </div>

  <h3 className="mt-8 text-2xl font-bold">
    {step.title}
  </h3>

  <p className="mt-5 text-gray-500 leading-8">
    {step.description}
  </p>

</div>

                {/* Step Number */}

                <div className="hidden lg:flex w-16 h-16 rounded-full bg-red-700 text-white font-bold text-xl items-center justify-center shadow-xl z-10 lg:translate-x-45">
  {index + 1}
</div>

                <div className="lg:w-3/12"></div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}