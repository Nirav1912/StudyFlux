import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";

export default function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState(
    user?.user_metadata?.full_name || "Guest User"
  );

  const defaultAvatar =
  "https://ui-avatars.com/api/?background=2563eb&color=fff&name=" +
  encodeURIComponent(
    user?.user_metadata?.full_name || "Guest User"
  );

const [avatar, setAvatar] = useState(
  localStorage.getItem(
    `studyflux-avatar-${user?.id || "guest"}`
  ) || defaultAvatar
);

  const fileInputRef = useRef(null);

  function changeAvatar(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const image = reader.result;

    setAvatar(image);

    localStorage.setItem(
  `studyflux-avatar-${user?.id || "guest"}`,
  image
);
  };

  reader.readAsDataURL(file);
}

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#fff7f7] via-[#f9f6f3] to-[#fff4f8] pt-44 pb-40 px-8 relative overflow-hidden">

    {/* Background blobs */}

    <div className="absolute -left-40 top-10 w-[500px] h-[500px] rounded-full bg-red-100 opacity-60 blur-3xl" />

    <div className="absolute -right-40 bottom-0 w-[500px] h-[500px] rounded-full bg-pink-100 opacity-60 blur-3xl" />

    {/* Main card */}

    <div className="w-full bg-white rounded-[32px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12 relative z-10">

      {/* Header */}

      <div className="flex items-center gap-6 mb-10">

        <div className="w-24 h-24 rounded-[28px] bg-red-50 flex items-center justify-center text-6xl">
          🧑‍💻
        </div>

        <div>
          <h1 className="text-7xl font-black text-slate-900">
            My Profile
          </h1>

          <p className="text-2xl text-gray-500 mt-2">
            Manage your StudyFlux account.
          </p>
        </div>

      </div>

      {/* Avatar */}

      <div className="flex flex-col items-center">

        <img
          src={avatar}
          alt="Avatar"
          className="w-44 h-44 rounded-full border-[6px] border-red-500 object-cover shadow-xl"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={changeAvatar}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-6 px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition"
        >
          Change Avatar
        </button>

      </div>

      {/* Profile fields */}

      <div className="grid md:grid-cols-2 gap-6 mt-12">

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-gray-500 mb-2">Full Name</p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 rounded-2xl p-4 outline-none text-slate-900"
          />
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-gray-500 mb-2">Email</p>

          <input
            disabled
            value={user?.email || "Guest"}
            className="w-full bg-gray-100 rounded-2xl p-4 text-slate-900"
          />
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-gray-500 mb-2">Member Since</p>

          <input
            disabled
            value={
              user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "-"
            }
            className="w-full bg-gray-100 rounded-2xl p-4 text-slate-900"
          />
        </div>

        <div className="rounded-3xl border border-gray-200 p-6 flex items-center justify-center">

          <div className="text-center">

            <h3 className="text-4xl font-bold text-red-600">
              24
            </h3>

            <p className="text-gray-500">
              Tests Completed
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}