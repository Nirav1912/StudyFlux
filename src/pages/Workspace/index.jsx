import { useEffect, useState } from "react";

import WorkspaceHeader from "../../components/workspace/layout/WorkspaceHeader";
import WorkspaceSidebar from "../../components/workspace/layout/WorkspaceSidebar";
import WorkspaceContent from "../../components/workspace/layout/WorkspaceContent";

export default function Workspace() {
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState("Learn");

  useEffect(() => {
    const data = localStorage.getItem("learningTopic");

    if (data) {
      setTopic(JSON.parse(data));
    }
  }, []);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        No Topic Selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-[1700px] mx-auto p-8">

        <WorkspaceHeader topic={topic} />

        <div className="grid grid-cols-12 gap-8 mt-8 items-start">

          <div className="col-span-12 lg:col-span-3 xl:col-span-2">
            <WorkspaceSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="col-span-12 lg:col-span-9 xl:col-span-10">
            <WorkspaceContent
              topic={topic}
              activeTab={activeTab}
            />
          </div>

        </div>

      </div>

    </div>
  );
}