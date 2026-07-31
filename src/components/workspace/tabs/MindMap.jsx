import { useEffect, useState } from "react";
import { Network, Loader2, RefreshCw } from "lucide-react";
import { generateMindMap } from "../../../services/gemini";

export default function MindMap({ topic }) {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMap();
  }, []);

  async function loadMap() {
    setLoading(true);

    try {
      const data = await generateMindMap(topic);
      setNodes(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 flex flex-col items-center border border-slate-200">
        <Loader2 className="animate-spin text-red-500" size={40} />
        <p className="mt-4">Generating Mind Map...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow p-10">

      <div className="flex justify-between items-center mb-10">

        <div className="flex items-center gap-3">
          <Network className="text-red-500" />
          <h2 className="text-3xl font-bold">
            AI Mind Map
          </h2>
        </div>

        <button
          onClick={loadMap}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white"
        >
          <RefreshCw size={18} />
          Regenerate
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {nodes.map((node, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-6 bg-slate-50"
          >
            <h3 className="font-bold text-red-500 mb-3">
              {node.title}
            </h3>

            <ul className="space-y-2">
              {node.points.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>

          </div>
        ))}

      </div>

    </div>
  );
}