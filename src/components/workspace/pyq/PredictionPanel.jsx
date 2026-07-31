import { usePYQ } from "../../../context/PYQContext";

export default function PredictionPanel() {
  const { files, analysis } = usePYQ();

  if (files.length < 3 || !analysis) return null;

  return (
    <div className="space-y-8">

      <div className="bg-white rounded-3xl border border-slate-200 p-8">

        <h2 className="text-3xl font-bold mb-6">
          Expected Questions
        </h2>

        <ul className="space-y-3">

          {analysis.expectedQuestions?.map((q, index) => (
            <li key={index}>
              • {q}
            </li>
          ))}

        </ul>

      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">

        <h2 className="text-3xl font-bold mb-6">
          Frequently Asked Concepts
        </h2>

        <ul className="space-y-3">

          {analysis.frequentlyAskedConcepts?.map((c, index) => (
            <li key={index}>
              • {c}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}