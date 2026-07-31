import { usePYQ } from "../../../context/PYQContext";

export default function ExamPredictor() {
  const { files, analysis } = usePYQ();

  if (files.length < 3 || !analysis) return null;

  const predictions = analysis.expectedQuestions?.map((question, index) => ({
    question,
    probability: Math.max(95 - index * 8, 55),
  }));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8">

      <h2 className="text-3xl font-bold mb-8">
        🔮 AI Exam Predictor
      </h2>

      <div className="space-y-6">

        {predictions.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6"
          >
            <div className="flex justify-between mb-3">

              <span className="font-semibold">
                {item.question}
              </span>

              <span className="text-red-500 font-bold">
                {item.probability}%
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-slate-200">

              <div
                style={{ width: `${item.probability}%` }}
                className="h-3 rounded-full bg-red-500"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}