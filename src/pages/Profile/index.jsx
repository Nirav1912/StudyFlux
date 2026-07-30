import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { 
  User, 
  Mail, 
  Calendar, 
  Camera, 
  Award, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  Upload
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState(
  user?.name || "Guest User"
);

  const defaultAvatar =
  "https://ui-avatars.com/api/?background=ef4444&color=fff&bold=true&name=" +
  encodeURIComponent(user?.name || "Guest User");

const [avatar, setAvatar] = useState(
  localStorage.getItem(`studyflux-avatar-${user?.id || "guest"}`) ||
  defaultAvatar
);

  const fileInputRef = useRef(null);

  // Logic Preserved Exactly
 function changeAvatar(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const image = reader.result;

    setAvatar(image);

    localStorage.setItem(
      `studyflux-avatar-${user.id}`,
      image
    );
  };

  reader.readAsDataURL(file);
}

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#ef4444] border border-red-100">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account <span className="text-[#ef4444]">Profile</span></h1>
            <p className="text-slate-500 font-medium">Manage your identity and platform preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: IDENTITY CARD */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm text-center">
            <div className="relative inline-block group">
              <img
                src={avatar}
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover shadow-xl border-4 border-white ring-1 ring-slate-200 transition-transform group-hover:scale-[1.02]"
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 w-full h-full bg-black/40 rounded-[2.5rem] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              >
                <Camera size={24} className="mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Update Photo</span>
              </button>
            </div>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={changeAvatar}
              className="hidden"
            />

            <h2 className="mt-6 text-xl font-bold text-slate-900 leading-none">{name}</h2>
            <p className="mt-2 text-slate-400 text-sm font-medium">{user?.email}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center gap-8">
              <div>
                <p className="text-xl font-black text-slate-900 leading-none">24</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Sessions</p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div>
                <p className="text-xl font-black text-[#ef4444] leading-none">Elite</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Rank</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden relative group text-center">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-2 text-red-500 mb-4 font-bold text-[10px] uppercase tracking-widest">
                <Zap size={14} fill="currentColor" /> Premium Status
              </div>
              <h3 className="text-xl font-bold leading-tight">Unlock AI Code Reviews</h3>
              <p className="mt-2 text-slate-500 text-xs leading-relaxed">Upgrade to get deep-dive explanations and unlimited test generation.</p>
              <button className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs transition-all active:scale-95">
                Upgrade to StudyFlux Pro
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACCOUNT FIELDS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
            <div className="flex flex-col items-center text-center gap-3 mb-8">
              <ShieldCheck size={20} className="text-[#ef4444]" />
              <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex justify-center items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <User size={12} /> Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-semibold focus:ring-4 focus:ring-red-50/50 focus:border-red-400 transition-all outline-none"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex justify-center items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  disabled
                  value={user?.email || "Guest"}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-400 font-semibold cursor-not-allowed italic"
                />
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label className="flex justify-center items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Calendar size={12} /> Member Since
                </label>
                <input
                  disabled
                  value={user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "-"}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-400 font-semibold cursor-not-allowed italic"
                />
              </div>

              {/* Tests Card */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 leading-none">24</p>
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Tests Completed</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-red-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-slate-400 font-medium italic">All data changes are synchronized with StudyFlux Cloud.</p>
              <button className="px-10 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
             <div className="flex flex-col items-center text-center gap-3 mb-6">
              <ShieldCheck size={20} className="text-[#ef4444]" />
              <h2 className="text-lg font-bold text-slate-900">Security</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-4 text-centerbg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-semibold text-slate-700">Two-Factor Authentication is currently ON</span>
              </div>
              <button className="text-xs font-bold text-[#ef4444] hover:underline">Manage</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}