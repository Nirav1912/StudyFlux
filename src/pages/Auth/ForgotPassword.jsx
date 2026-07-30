import { useState } from "react";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../../api/auth";

import { showSuccess, showError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  async function handleSendOtp() {
    try {
      await sendOtp(email);

      showSuccess("OTP Sent");

      setStep(2);
    } catch (err) {
      showError(
        err.response?.data?.message || "Failed"
      );
    }
  }

  async function handleVerifyOtp() {
    try {
      await verifyOtp(email, otp);

      showSuccess("OTP Verified");

      setStep(3);
    } catch (err) {
      showError(
        err.response?.data?.message || "Invalid OTP"
      );
    }
  }

  async function handleResetPassword() {
    try {
      await resetPassword(email, password);

      showSuccess("Password Changed");

      navigate("/auth");
    } catch (err) {
      showError(
        err.response?.data?.message || "Failed"
      );
    }
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100">
    <div className="bg-white shadow-xl rounded-3xl p-8 w-[420px]">

      <h1 className="text-3xl font-bold text-center mb-6">
        Forgot Password
      </h1>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            onClick={handleSendOtp}
            className="w-full bg-red-600 text-white py-3 rounded-xl"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-red-600 text-white py-3 rounded-xl"
          >
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            Reset Password
          </button>
        </>
      )}

    </div>
  </div>
);
}