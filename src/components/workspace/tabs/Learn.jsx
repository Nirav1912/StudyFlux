import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Loader2 } from "lucide-react";
import { generateLearnContent } from "../../../services/gemini";

export default function Learn({ topic }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);

      const result = await generateLearnContent(topic);

      setContent(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow border border-slate-200 flex flex-col items-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
        <p className="mt-4 text-slate-500">
          AI is preparing your lesson...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow border border-slate-200 p-10">

      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-red-500" size={30} />
        <h2 className="text-3xl font-bold">Learn</h2>
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

    </div>
  );
}