import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

import {
  showSuccess,
  showWarning,
  showError,
} from "../../utils/toast";

export default function Auth() {
  const navigate = useNavigate();
const { loginUser } = useAuth();

  const [tab, setTab] = useState("login");

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {
  if (!email || !password) {
    showWarning("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const res = await login({
      email,
      password,
    });

    loginUser(res.data.user, res.data.token);
    showSuccess("Login Successful 🎉");

    navigate("/dashboard");
  } catch (err) {
    showError(
      err.response?.data?.message || "Login Failed"
    );
  } finally {
    setLoading(false);
  }
}

  async function handleRegister() {
  if (!name || !email || !password) {
    showWarning("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    await register({
      name,
      email,
      password,
    });

    showSuccess("🎉 Account created!");

    setTab("login");
  } catch (err) {
    showError(
      err.response?.data?.message || "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
}


  
  return (
   <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fff4f4] via-[#fdf8f2] to-[#fff0f7] flex items-center justify-center px-5">
        {/* Background glow */}

<div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-red-200 blur-[180px]" />

<div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-pink-200 blur-[180px]" />

<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-100 blur-[220px]" />

      <div className="relative z-10 w-full max-w-[760px] bg-white rounded-[40px] px-10 py-12 shadow-[0_25px_80px_rgba(0,0,0,0.15)]">

        <h1 className="text-7xl font-black text-center text-slate-900">
          StudyFlux
        </h1>

        <p className="text-center text-slate-500 text-2xl mt-2">
          AI-Powered Learning That Adapts to You.
        </p>

        <div className="flex mt-10 mb-10 p-1 bg-gray-100 rounded-full">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-4 rounded-full text-xl font-semibold transition-all ${
              tab === "login"
  ? "bg-red-600 text-white"
  : "bg-white/5 text-slate-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-4 rounded-full text-xl font-semibold transition-all ${
              tab === "register"
  ? "bg-red-600 text-white"
  : "bg-white/5 text-slate-400"
            }`}
          >
            Register
          </button>

        </div>

        {tab === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-5 rounded-[20px] border-2 border-gray-400 bg-white text-black mb-5 outline-none focus:border-red-500"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-5 rounded-[20px] border-2 border-gray-400 bg-white text-black mb-5 outline-none focus:border-red-500"
        />

        <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="w-full p-5 rounded-[20px] border-2 border-gray-400 bg-white text-black mb-5 outline-none focus:border-red-500"
/>
{tab === "login" && (
  <div className="flex justify-end mb-5">
    <button
  onClick={() => navigate("/forgot-password")}
  className="text-red-500 hover:text-red-700 text-sm font-semibold"
>
  Forgot Password?
</button>
  </div>
)}

        {tab === "login" ? (
          <button
            onClick={handleLogin}
            disabled={loading}
           className="w-full mt-5 py-5 rounded-full border-2 border-gray-400 text-gray-700 text-xl hover:bg-gray-100"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        ) : (
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xl font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        )}

        <button
  onClick={() => {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
  }}
  className="w-full mt-5 py-5 rounded-full border-2 border-gray-400 text-gray-700 text-xl hover:bg-gray-100"
>
  Continue as Guest
</button>

      </div>

    </div>
  );
}