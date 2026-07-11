export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">

        {/* Heading */}

        <span className="text-[#ef4444] font-bold uppercase tracking-[0.3em] text-xs">
          Workflow
        </span>

        <h2 className="mt-4 text-5xl md:text-6xl font-bold text-center text-slate-900">
          How It Works
        </h2>

        <p className="mt-6 text-xl text-slate-500 text-center max-w-2xl">
          Three simple steps to master programming with AI.
        </p>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">

          <div className="bg-slate-50 p-8 rounded-3xl text-center flex flex-col items-center">
            <div className="text-5xl mb-4">1️⃣</div>

            <h3 className="text-2xl font-bold">
              Choose
            </h3>

            <p className="mt-4 text-slate-500">
              Select your language and difficulty level.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl text-center flex flex-col items-center">
            <div className="text-5xl mb-4">2️⃣</div>

            <h3 className="text-2xl font-bold">
              Practice
            </h3>

            <p className="mt-4 text-slate-500">
              Solve AI-generated questions.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl text-center flex flex-col items-center">
            <div className="text-5xl mb-4">3️⃣</div>

            <h3 className="text-2xl font-bold">
              Improve
            </h3>

            <p className="mt-4 text-slate-500">
              Track progress and weak topics.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}