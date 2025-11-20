// src/pages/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import logoicon from "../images/LogoIcon.png";
import logotext from "../images/NameLogo.png";

const API = process.env.REACT_APP_API_URL || "http://localhost:5100";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokenFromQuery = query.get("token") || "";
  const emailFromQuery = query.get("email") ? decodeURIComponent(query.get("email")) : "";

  const [token, setToken] = useState(tokenFromQuery);
  const [email, setEmail] = useState(emailFromQuery);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    // If token or email missing, show error automatically
    if (!token || !email) {
      showToast("error", "Missing reset token or email. Use the link from your email.");
    }
    // sync state if the URL changes
    setToken(tokenFromQuery);
    setEmail(emailFromQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const validate = () => {
    if (!newPassword) return "Please enter a new password";
    if (newPassword.length < 6) return "Password must be at least 6 characters";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const validationError = validate();
    setError(validationError);
    if (validationError) {
      showToast("error", validationError);
      return;
    }
    if (!token || !email) {
      showToast("error", "Missing token or email; please use the link in your email.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          token: token,
          newPassword: newPassword,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      showToast("success", data.message || "Password reset successfully. Redirecting to login...");
      // delay then redirect to login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Reset password error:", err);
      showToast("error", err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400 flex items-center justify-center p-6 relative">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl animate-slide-in ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? <IoCheckmarkCircle className="w-6 h-6" /> : <IoCloseCircle className="w-6 h-6" />}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -top-10 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -right-24 bottom-10 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      </div>

      <div className="relative w-full max-w-md text-center z-10">
        <a href="/" className="inline-flex items-center justify-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow">
            <img src={logoicon} alt="logo" className="w-10 h-10 object-contain" />
          </div>
          <img src={logotext} alt="name logo" className="h-10 object-contain" />
        </a>

        <h2 className="text-3xl font-bold text-sky-700 mb-1">Set a new password</h2>
        <p className="text-sm text-sky-700 mb-6">Provide a new password for <span className="font-semibold">{email || "your account"}</span></p>

        <div className="mx-auto w-full p-8 rounded-2xl backdrop-blur-[10px] bg-white/10 border border-white/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5 text-sky-800">
            <div className="text-left">
              <label htmlFor="new-password" className="block text-sm font-semibold text-sky-700 mb-1">New Password</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (touched) setError(validate());
                }}
                placeholder="Enter new password"
                className={`w-full px-4 py-3 rounded-lg bg-white/30 backdrop-filter backdrop-blur-sm border text-sky-900 ${error && touched ? "border-red-400" : "border-white/20"}`}
              />
            </div>

            <div className="text-left">
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-sky-700 mb-1">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (touched) setError(validate());
                }}
                placeholder="Repeat new password"
                className={`w-full px-4 py-3 rounded-lg bg-white/30 backdrop-filter backdrop-blur-sm border text-sky-900 ${error && touched ? "border-red-400" : "border-white/20"}`}
              />
            </div>

            {error && touched && <p className="text-xs text-red-500 mt-1 text-left">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-sky-700 disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-3 rounded-lg border border-white/30 text-white/90 hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <p className="text-sm text-white/90 mt-4">
          Remembered your password?{" "}
          <button onClick={() => navigate("/login")} className="underline text-white">
            Sign In
          </button>
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(10%); opacity: 0;}
          to { transform: translateX(0); opacity: 1;}
        }
        .animate-slide-in { animation: slide-in 0.28s ease-out; }
      `}</style>
    </div>
  );
};

export default ResetPassword;
