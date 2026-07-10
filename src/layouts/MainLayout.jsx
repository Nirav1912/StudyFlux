import { Link, NavLink, useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  const hideNavbar =
  location.pathname === "/test" ||
  location.pathname === "/result";
  
    return (
    
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      {!hideNavbar && (
  <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl">

  <div className="px-4 py-4 flex items-center justify-between">
  
    {/* Logo */}

    <Link
      to="/dashboard"
      className="hidden md:block text-4xl font-black text-white"
    >
      StudyFlux
    </Link>

    {/* Desktop Navbar */}

    <div className="hidden md:flex gap-8 text-white">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-test">Create Test</Link>
      <Link to="/history">History</Link>
      <Link to="/progress">📊 Progress</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
    </div>

    {/* Mobile Navbar */}

    <div className="flex md:hidden w-full justify-around text-2xl">

      <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive
      ? "text-red-400"
      : "text-white"
  }
>
  🏠
</NavLink>

      <NavLink
  to="/create-test"
  className={({ isActive }) =>
    isActive ? "text-red-400" : "text-white"
  }
>
  ➕
</NavLink>

      <NavLink
  to="/history"
  className={({ isActive }) =>
    isActive ? "text-red-400" : "text-white"
  }
>
  📜
</NavLink>

      <NavLink
  to="/progress"
  className={({ isActive }) =>
    isActive ? "text-red-400" : "text-white"
  }
>
  📊
</NavLink>

      <NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ? "text-red-400" : "text-white"
  }
>
  👤
</NavLink>

      <NavLink
  to="/settings"
  className={({ isActive }) =>
    isActive ? "text-red-400" : "text-white"
  }
>
  ⚙️
</NavLink>

    </div>

  </div>

</nav>
      )}

      {/* Page Content */}

      <main className="w-full min-h-screen px-6 pt-10 pb-40">
  {children}
</main>

    </div>
  );
}