import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [timer, setTimer] = useState(true);

  async function logout() {
    localStorage.removeItem("guest");

    await supabase.auth.signOut();

    navigate("/auth");
  }

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] pt-36 pb-40 px-8 overflow-hidden relative">

    {/* Background shapes */}

    <div className="absolute -left-40 top-10 w-[500px] h-[500px] rounded-full bg-red-100 opacity-60 blur-3xl" />

    <div className="absolute -right-40 bottom-0 w-[500px] h-[500px] rounded-full bg-pink-100 opacity-60 blur-3xl" />

    {/* Main card */}
{/* Main card */}

<div className="w-full bg-white rounded-[32px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-10 relative z-10">
    

      {/* Header */}

      <div className="flex items-center gap-6 mb-8">

       <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-5xl">
  ⚙️
</div>

        <div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900">
  Settings
</h1>

<p className="mt-2 text-lg md:text-2xl text-gray-500">
  Manage your StudyFlux preferences.
</p>

        </div>

      </div>

      {/* Notifications */}

      <div className="mb-5 flex items-center justify-between rounded-[24px] border border-gray-200 px-8 py-6">

        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            🔔
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Notifications
            </h2>

            <p className="text-lg text-gray-500">
              Receive important updates.
            </p>

          </div>

        </div>

        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-8 h-8 accent-red-600 mr-6"
        />

      </div>

      {/* Sound */}

      <div className="mb-5 flex items-center justify-between rounded-[24px] border border-gray-200 px-12 py-6">

        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            🔊
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Sound Effects
            </h2>

            <p className="text-lg text-gray-500">
              Enable click sounds.
            </p>

          </div>

        </div>

        <input
          type="checkbox"
          checked={sound}
          onChange={() => setSound(!sound)}
          className="w-8 h-8 accent-red-600"
        />

      </div>

      {/* Timer */}

      <div className="mb-5 flex items-center justify-between rounded-[24px] border border-gray-200 px-8 py-6">

        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            ⏱️
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Test Timer
            </h2>

            <p className="text-lg text-gray-500">
              Enable countdown timer during tests.
            </p>

          </div>

        </div>

        <input
          type="checkbox"
          checked={timer}
          onChange={() => setTimer(!timer)}
          className="w-8 h-8 accent-red-600"
        />

      </div>

      {/* About */}

      <div className="rounded-[24px] border border-gray-200 px-8 py-6">

        <div className="flex items-center gap-5 mb-4">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            ℹ️
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            About StudyFlux
          </h2>

        </div>

        <p className="text-lg text-gray-500">
          Version 1.0.0
        </p>

        <p className="text-lg text-gray-500 mt-2">
          AI-powered programming learning platform built with React,
          Supabase and Gemini AI.
        </p>

      </div>

      {/* Logout */}

      <button
        onClick={logout}
        className="mt-8 w-full py-5 rounded-[20px] bg-red-600 hover:bg-red-700 text-white text-3xl font-bold shadow-lg transition-all"
      >
        Logout
      </button>

    </div>
  </div>
);
}