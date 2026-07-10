import { FaBell, FaSearch } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center mb-8">

      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-4 text-slate-500" />

        <input
          placeholder="Search..."
          className="w-full bg-slate-900 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
        />

      </div>

      <div className="flex items-center gap-5">

        <button className="relative">

          <FaBell className="text-2xl text-slate-300" />

          <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">

            2

          </span>

        </button>

        <img
          src="https://ui-avatars.com/api/?name=StudyFlux"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

      </div>

    </header>
  );
}