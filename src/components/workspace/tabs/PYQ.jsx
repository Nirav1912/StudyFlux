import UploadZone from "../pyq/UploadZone";
import UploadedFiles from "../pyq/UploadedFiles";
import AnalysisPanel from "../pyq/AnalysisPanel";
import PredictionPanel from "../pyq/PredictionPanel";
import ExamPredictor from "../pyq/ExamPredictor";

export default function PYQ() {
  return (
    <div className="space-y-8">

      <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">

        <h1 className="text-4xl font-bold text-slate-900">
          📄 PYQ Intelligence
        </h1>

        <p className="mt-3 text-slate-500">
          Upload Previous Year Question Papers and let AI analyze patterns.
        </p>

      </div>

      <UploadZone />

      <UploadedFiles />

      <AnalysisPanel />

      <PredictionPanel />
<ExamPredictor />
    </div>
  );
}