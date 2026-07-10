import { motion } from "framer-motion";
import {
  FaRobot,
  FaChartLine,
  FaCode,
  FaCheckCircle,
} from "react-icons/fa";

export default function DashboardPreview() {
  return (
    <section className="py-28 bg-gray-50">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">

            Experience StudyFlux

          </span>

          <h2 className="mt-6 text-5xl font-black text-gray-900">

            Learn Smarter with AI

          </h2>

          <p className="mt-6 text-xl text-gray-600">

            StudyFlux guides you through the complete programming
            learning journey—from AI-generated tests to personalized
            performance analysis.

          </p>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-[35px] border border-gray-200 shadow-2xl overflow-hidden"
        >

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-10 border-r border-gray-200">

              <h3 className="text-2xl font-bold">

                Create Your Test

              </h3>

              <div className="mt-8 space-y-6">

                <div>

                  <p className="text-gray-500 mb-2">

                    Programming Language

                  </p>

                  <div className="border rounded-xl p-4">

                    Python

                  </div>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">

                    Difficulty

                  </p>

                  <div className="border rounded-xl p-4">

                    Medium

                  </div>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">

                    Questions

                  </p>

                  <div className="border rounded-xl p-4">

                    20 Questions

                  </div>

                </div>

                <button className="w-full bg-red-700 hover:bg-red-800 text-white rounded-xl py-4 font-semibold">

                  Generate AI Test

                </button>

              </div>

            </div>

            {/* RIGHT */}

            <div className="p-10">

              <h3 className="text-2xl font-bold">

                What You'll Get

              </h3>

              <div className="mt-8 space-y-6">

                <div className="flex gap-4">

                  <FaRobot className="text-red-700 text-2xl" />

                  <div>

                    <h4 className="font-semibold">

                      AI Generated Questions

                    </h4>

                    <p className="text-gray-500">

                      Personalized based on your selected language.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <FaCheckCircle className="text-green-600 text-2xl" />

                  <div>

                    <h4 className="font-semibold">

                      Detailed Explanations

                    </h4>

                    <p className="text-gray-500">

                      Understand every correct answer.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <FaChartLine className="text-blue-600 text-2xl" />

                  <div>

                    <h4 className="font-semibold">

                      Performance Tracking

                    </h4>

                    <p className="text-gray-500">

                      View your progress after each completed test.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <FaCode className="text-purple-600 text-2xl" />

                  <div>

                    <h4 className="font-semibold">

                      Multiple Languages

                    </h4>

                    <p className="text-gray-500">

                      C • C++ • Java • Python • JavaScript

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}