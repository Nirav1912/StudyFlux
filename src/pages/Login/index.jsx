import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({
        email,
        password,
      });

      loginUser(
        res.data.user,
        res.data.token
      );

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-md p-8">

        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to continue your learning journey.
        </p>

        <button className="w-full bg-white text-black rounded-xl py-3 font-semibold mb-4">
          Continue with Google
        </button>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white mb-6 outline-none"
        />

        <Button
          className="w-full"
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?
        </p>

        <Button
          variant="secondary"
          className="w-full mt-3"
        >
          Create Account
        </Button>

        <Button
          variant="outline"
          className="w-full mt-3"
        >
          Continue as Guest
        </Button>

      </div>

    </div>
  );
}