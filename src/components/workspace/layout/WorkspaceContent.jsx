import Learn from "../tabs/Learn";
import AITest from "../tabs/AITest";
import PYQ from "../tabs/PYQ";
import Notes from "../tabs/Notes";
import Flashcards from "../tabs/Flashcards";
import MindMap from "../tabs/MindMap";
import AskAI from "../tabs/AskAI";

export default function WorkspaceContent({
  topic,
  activeTab,
}) {
  switch (activeTab) {
    case "Learn":
      return (
        <div className="space-y-8">
          <Learn topic={topic} />
        </div>
      );

    case "AI Test":
      return (
        <div className="space-y-8">
          <AITest topic={topic} />
        </div>
      );

    case "PYQ":
      return (
        <div className="space-y-8">
          <PYQ topic={topic} />
        </div>
      );

    case "Notes":
      return (
        <div className="space-y-8">
          <Notes topic={topic} />
        </div>
      );

    case "Flashcards":
      return (
        <div className="space-y-8">
          <Flashcards topic={topic} />
        </div>
      );

    case "Mind Map":
      return (
        <div className="space-y-8">
          <MindMap topic={topic} />
        </div>
      );

    case "Ask AI":
      return (
        <div className="space-y-8">
          <AskAI topic={topic} />
        </div>
      );

    default:
      return (
        <div className="space-y-8">
          <Learn topic={topic} />
        </div>
      );
  }
}