import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  User,
  Settings,
  Bell,
  LogOut,
  Zap,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const { user } = useAuth();
  const [avatar, setAvatar] = useState("/icon-512.png");
const navigate = useNavigate();

async function logout() {
  localStorage.removeItem("guest");
  await supabase.auth.signOut();
  navigate("/auth");
}
useEffect(() => {
  const savedAvatar = localStorage.getItem(
    `studyflux-avatar-${user?.id || "guest"}`
  );

  if (savedAvatar) {
    setAvatar(savedAvatar);
  }
}, [user]);
  const hideNavbar = location.pathname === "/test" || location.pathname === "/result";

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/create-test", label: "Create Test", icon: PlusCircle },
    { path: "/history", label: "History", icon: History },
    { path: "/progress", label: "Progress", icon: BarChart3 },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-[#fafafa] text-slate-900 overflow-hidden font-sans">
      {!hideNavbar && (
        <aside 
          className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shrink-0 z-40 ${
            isSidebarOpen ? "w-[280px]" : "w-0 -translate-x-full"
          }`}
        >
          <div className="p-6 h-20 flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-4">
  <img
  src="/icon-512.png"
  alt="StudyFlux"
  className="w-12 h-12 rounded-2xl object-cover"
/>

  <div>
    <h1 className="text-2xl font-black tracking-tight text-slate-900">
      StudyFlux
    </h1>

    <p className="text-xs text-slate-400 font-medium">
      AI Learning Platform
    </p>
  </div>
</div></div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
           <p className="px-4 mb-3 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
  Learning
</p>
 {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap ${
                    isActive ? "bg-red-50 text-[#ef4444] font-semibold" : "text-slate-500 hover:bg-red-50 hover:text-red-500 hover:translate-x-1"
                  }`
                }
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">

  <div className="flex items-center gap-4 px-3 mb-4">

    <img
      src={avatar}
      alt="Profile"
      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
    />

    <div className="min-w-0">

      <p className="text-sm font-bold truncate text-slate-900">
        {user?.user_metadata?.full_name || "User"}
      </p>

      <p className="text-xs text-slate-400 truncate">
        {user?.email}
      </p>

    </div>

  </div>
             <button
  onClick={logout}
  className="flex items-center gap-3 w-full px-3 py-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
>
  <LogOut size={14} />
  Sign Out
</button>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {!hideNavbar && (
          <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-30 shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              >
                {isSidebarOpen ? (
  <PanelLeftClose size={20} />
) : (
  <PanelLeftOpen size={20} />
)}
              </button>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
  Menu
</h2>
            </div>
            <div className="flex items-center gap-4">
               <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Bell size={20}/></button>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
  <div className="w-full min-h-screen px-8 py-8 flex justify-center">
  <div className="w-full max-w-7xl">
    {children}
  </div>
</div>
</main>
      </div>
    </div>
  );
}