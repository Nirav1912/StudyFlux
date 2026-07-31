import SearchBox from "../../components/learn/SearchBox";
import LearningModes from "../../components/learn/LearningModes";
import PopularTopics from "../../components/learn/PopularTopics";
import RecentTopics from "../../components/learn/RecentTopics";

export default function LearnAnything() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900">
            Learn Anything
          </h1>

          <p className="text-slate-500 mt-4 text-lg">
            Search any subject, topic, course or upload PYQs.
          </p>
        </div>

        <SearchBox />

        <div className="mt-12">
          <LearningModes />
        </div>

        <div className="mt-12">
          <PopularTopics />
        </div>

        <div className="mt-12">
          <RecentTopics />
        </div>

      </div>

    </div>
  );
}