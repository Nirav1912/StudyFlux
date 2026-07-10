import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Volume2, 
  Timer as TimerIcon, 
  Info, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Sparkles
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [timer, setTimer] = useState(true);

  // Logic Preserved Exactly
  async function logout() {
    localStorage.removeItem("guest");
    await supabase.auth.signOut();
    navigate("/auth");
  }

  // Custom Toggle Component for the SaaS look
  const Toggle = ({ enabled, setEnabled }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-100 focus:ring-offset-2 ${
        enabled ? 'bg-[#ef4444]' : 'bg-slate-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#ef4444] border border-red-100">
            <SettingsIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight font-sans">Settings</h1>
            <p className="text-slate-500 font-medium">Manage your learning workspace and preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        
        {/* PREFERENCES SECTION */}
       <section className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">

  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-2 text-center">
      <Sparkles size={14} className="text-[#ef4444]" />
      Interface Preferences
    </h2>
  </div>

  <div className="divide-y divide-slate-100">

    {/* Notifications */}

    <div className="px-8 py-8 flex flex-col items-center justify-center text-center gap-5 group hover:bg-slate-50/50 transition-colors">

      <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
        <Bell size={20} />
      </div>

      <div>
        <h3 className="font-bold text-slate-900">
          Global Notifications
        </h3>

        <p className="text-sm text-slate-500 mt-1.5">
          Receive alerts for test completions and milestones.
        </p>
      </div>

      <Toggle
        enabled={notifications}
        setEnabled={setNotifications}
      />

    </div>

    {/* Sound */}

    <div className="px-8 py-8 flex flex-col items-center justify-center text-center gap-5 group hover:bg-slate-50/50 transition-colors">

      <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
        <Volume2 size={20} />
      </div>

      <div>
        <h3 className="font-bold text-slate-900">
          Sound Effects
        </h3>

        <p className="text-sm text-slate-500 mt-1.5">
          Enable audio feedback during coding assessments.
        </p>
      </div>

      <Toggle
        enabled={sound}
        setEnabled={setSound}
      />

    </div>

    {/* Timer */}

    <div className="px-8 py-8 flex flex-col items-center justify-center text-center gap-5 group hover:bg-slate-50/50 transition-colors">

      <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
        <TimerIcon size={20} />
      </div>

      <div>
        <h3 className="font-bold text-slate-900">
          Adaptive Timer
        </h3>

        <p className="text-sm text-slate-500 mt-1.5">
          Display a live countdown clock during active tests.
        </p>
      </div>

      <Toggle
        enabled={timer}
        setEnabled={setTimer}
      />

    </div>

  </div>

</section>

        {/* ABOUT SECTION */}
        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex flex-col items-center text-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-slate-100 text-slate-500">
              <Info size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">System Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center gap-2 text-sm">
                <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">App Version</span>
                <span className="text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-full">v1.0.0 Stable</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-sm">
                <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">Engine</span>
                <span className="text-slate-900 font-bold">Gemini 1.5 Pro</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-sm">
                <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">Database</span>
                <span className="text-slate-900 font-bold">Supabase Realtime</span>
              </div>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                StudyFlux is an AI-native workspace designed to accelerate coding proficiency through high-fidelity diagnostic testing.
              </p>
            </div>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="bg-red-50 border border-red-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white rounded-2xl text-red-500 shadow-sm border border-red-100">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none">Security & Session</h2>
              <p className="text-sm text-red-600/70 mt-1.5 font-medium">Terminate your current session and clear local cache.</p>
            </div>
          </div>
          <button
            onClick={logout}
           className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
          >
            <LogOut size={18} />
            Secure Logout
          </button>
        </section>

        {/* FOOTER SUBTLE */}
        <div className="text-center pt-4">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.4em]">Designed for Cognitive Clarity</p>
        </div>
      </div>
    </div>
  );
}