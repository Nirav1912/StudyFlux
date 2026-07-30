import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function updatePassword() {
    alert("Password reset with MySQL backend will be added later.");
    navigate("/auth");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-5">
      <div className="bg-white rounded-[32px] shadow-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-5 rounded-2xl border-2 border-gray-300"
        />

        <button
          onClick={updatePassword}
          className="w-full mt-6 py-4 rounded-2xl bg-red-600 text-white font-semibold"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}