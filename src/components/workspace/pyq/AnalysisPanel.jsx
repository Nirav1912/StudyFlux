import { usePYQ } from "../../../context/PYQContext";

export default function AnalysisPanel() {
  const { files, analysis } = usePYQ();

  if (files.length < 3) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold mb-4">
          AI Pattern Analysis
        </h2>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-yellow-700 font-semibold">
            Upload at least 3 Previous Year Papers to unlock AI Pattern Analysis.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold mb-4">
          AI Pattern Analysis
        </h2>

        <p>AI is analyzing your papers...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8">

      <h2 className="text-3xl font-bold mb-8">
        Topic Weightage
      </h2>

      <div className="space-y-4">

        {analysis.importantTopics?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-2xl p-4"
          >
            <span className="font-semibold">
              {item.topic}
            </span>

            <span className="text-red-500 font-bold">
              {item.weightage}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}