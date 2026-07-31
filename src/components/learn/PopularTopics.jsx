import { useNavigate } from "react-router-dom";

const topics = [
  "Pointers",
  "Python",
  "Java",
  "C Programming",
  "DBMS",
  "Operating System",
  "Computer Networks",
  "Data Structures",
  "Machine Learning",
  "Artificial Intelligence",
  "Photosynthesis",
  "Calculus",
  "Statistics",
  "Thermodynamics",
  "Digital Electronics",
];

export default function PopularTopics() {
  const navigate = useNavigate();

  function selectTopic(topic) {
    localStorage.setItem(
      "learningTopic",
      JSON.stringify({
        topic,
        subject: "",
        course: "",
        education: "",
        difficulty: "",
      })
    );

    navigate("/workspace");
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Popular Topics
      </h2>

      <div className="flex flex-wrap gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => selectTopic(topic)}
            className="px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-red-500 hover:bg-red-50 transition font-semibold"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}