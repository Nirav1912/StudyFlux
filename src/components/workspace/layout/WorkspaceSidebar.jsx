import {
  BookOpen,
  FileText,
  Brain,
  ClipboardCheck,
  MessageSquare,
  Network,
  Sparkles,
} from "lucide-react";

const menu = [
  {
    title: "Learn",
    icon: BookOpen,
  },
  {
    title: "AI Test",
    icon: ClipboardCheck,
  },
  {
    title: "PYQ",
    icon: FileText,
  },
  {
    title: "Notes",
    icon: Sparkles,
  },
  {
    title: "Flashcards",
    icon: Brain,
  },
  {
    title: "Mind Map",
    icon: Network,
  },
  {
    title: "Ask AI",
    icon: MessageSquare,
  },
];

export default function WorkspaceSidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sticky top-8 h-fit">

      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Workspace
      </h2>

      <div className="space-y-3">

        {menu.map((item) => (
          <button
            key={item.title}
            onClick={() => setActiveTab(item.title)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition font-semibold text-left ${
  activeTab === item.title
    ? "bg-red-500 text-white shadow-md"
    : "hover:bg-slate-100 text-slate-700"
}`}
          >
            <item.icon size={20} />
            {item.title}
          </button>
        ))}

      </div>

    </div>
  );
}