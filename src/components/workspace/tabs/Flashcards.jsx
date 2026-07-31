import { useEffect, useState } from "react";
import { Brain, Loader2, RefreshCw } from "lucide-react";
import { generateFlashcards } from "../../../services/gemini";

export default function Flashcards({ topic }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    loadCards();
  }, []);

  async function loadCards() {
    setLoading(true);

    try {
      const data = await generateFlashcards(topic);
      setCards(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 flex flex-col items-center border border-slate-200">
        <Loader2 className="animate-spin text-red-500" size={40} />
        <p className="mt-4">Generating Flashcards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Brain className="text-red-500" />
          <h2 className="text-3xl font-bold">
            AI Flashcards
          </h2>
        </div>

        <button
          onClick={loadCards}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white"
        >
          <RefreshCw size={18} />
          Regenerate
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() =>
              setFlipped({
                ...flipped,
                [index]: !flipped[index],
              })
            }
            className="cursor-pointer bg-white rounded-3xl border border-slate-200 shadow p-8 min-h-[220px] flex items-center justify-center text-center hover:border-red-400 transition"
          >
            {flipped[index] ? (
              <div>
                <h3 className="text-red-500 font-bold mb-4">
                  Answer
                </h3>

                <p>{card.answer}</p>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-slate-900 mb-4">
                  Question
                </h3>

                <p>{card.question}</p>
              </div>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}