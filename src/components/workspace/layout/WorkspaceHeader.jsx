import { Sparkles, GraduationCap } from "lucide-react";

export default function WorkspaceHeader({ topic }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10">

      <div className="flex items-center justify-between">

        <div>

          <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full font-bold text-sm mb-5">
            <Sparkles size={16} />
            AI Learning Workspace
          </div>

          <h1 className="text-6xl font-black text-slate-900">
            {topic.topic}
          </h1>

          <p className="mt-3 text-slate-500 text-lg">
            Personalized AI learning experience
          </p>

          <div className="flex flex-wrap gap-3 mt-8">

            <span className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
              {topic.subject || "Unknown Subject"}
            </span>

            <span className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              {topic.course || "General"}
            </span>

            <span className="px-5 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
              {topic.education || "All Levels"}
            </span>

            <span className="px-5 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {topic.difficulty || "Auto"}
            </span>

          </div>

        </div>

        <div className="hidden lg:flex h-28 w-28 rounded-3xl bg-red-50 items-center justify-center">

          <GraduationCap
            size={56}
            className="text-red-500"
          />

        </div>

      </div>

    </div>
  );
}