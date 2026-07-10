import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[40px] overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-2xl"
        >

          <div className="grid lg:grid-cols-2 gap-10 items-center p-16">

            {/* Left */}

            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-white font-semibold">

                🚀 Start Your Journey

              </span>

              <h2 className="text-5xl font-black text-white mt-8 leading-tight">

                Become a Better Programmer

                <br />

                with AI

              </h2>

              <p className="mt-8 text-red-100 text-xl leading-9">

                Generate unlimited programming tests,
                receive AI explanations,
                improve weak topics,
                and track your learning progress.

              </p>

            </div>

            {/* Right */}

            <div className="flex flex-col items-center lg:items-end gap-6">

              <Link
                to="/auth"
                className="bg-white text-red-700 px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-lg flex items-center gap-3"
              >
                Get Started

                <FaArrowRight />

              </Link>

              <p className="text-red-100">

                Free • AI Powered • Personalized Learning

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}