import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaBook,
  FaChartBar,
  FaAward,
  FaCog,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Create Test",
    icon: <FaClipboardList />,
    path: "/create-test",
  },
  {
    title: "My Tests",
    icon: <FaHistory />,
    path: "/tests",
  },
  
  {
    title: "Analytics",
    icon: <FaChartBar />,
    path: "/analytics",
  },
  {
    title: "Certificates",
    icon: <FaAward />,
    path: "/certificates",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">

      <div className="p-8">

        <h1 className="text-3xl font-bold text-blue-500">

          StudyFlux

        </h1>

        <p className="text-slate-400 mt-2">

          AI Learning Platform

        </p>

      </div>

      <nav className="px-5">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl mb-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span>{item.title}</span>

          </NavLink>
        ))}

      </nav>

      <div className="absolute bottom-8 left-5 right-5">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5">

          <h3 className="font-bold">

            StudyFlux Pro

          </h3>

          

        </div>

      </div>

    </aside>
  );
}