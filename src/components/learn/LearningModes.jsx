import { BookOpen, Brain, FileText } from "lucide-react";

const modes = [
  {
    title: "Universal Learning",
    icon: BookOpen,
    desc: "Learn any subject, topic or course.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Programming",
    icon: Brain,
    desc: "Master coding with AI explanations.",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "PYQ Intelligence",
    icon: FileText,
    desc: "Upload previous year papers for AI analysis.",
    color: "bg-green-50 text-green-600",
  },
];

export default function LearningModes() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Learning Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-red-300 hover:shadow-lg transition cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${mode.color}`}
            >
              <mode.icon size={28} />
            </div>

            <h3 className="text-xl font-bold mt-6">
              {mode.title}
            </h3>

            <p className="text-slate-500 mt-3">
              {mode.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}