import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, FileText } from "lucide-react";
import { generateNotes } from "../../../services/gemini";

export default function Notes({ topic }) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setLoading(true);

      const result = await generateNotes(topic);

      setNotes(result);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow flex flex-col items-center">
        <Loader2 className="animate-spin text-red-500" size={40} />
        <p className="mt-5 text-slate-500">
          AI is generating notes...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow p-10">

      <div className="flex items-center gap-3 mb-8">
        <FileText className="text-red-500" />
        <h2 className="text-3xl font-bold">
          AI Notes
        </h2>
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown>{notes}</ReactMarkdown>
      </div>

    </div>
  );
}