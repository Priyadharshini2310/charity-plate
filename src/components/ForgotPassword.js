// // src/pages/ForgotPassword.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
// import logoicon from "../images/LogoIcon.png";
// import logotext from "../images/NameLogo.png";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [touched, setTouched] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, type: "", message: "" });
//   const [sent, setSent] = useState(false);

//   const isValidEmail = (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(value);
//   };

//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//     setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
//   };

//   const handleBlur = () => {
//     setTouched(true);
//     setError(validate(email));
//   };

//   const validate = (val) => {
//     if (!val?.trim()) return "Email is required";
//     if (!isValidEmail(val)) return "Please enter a valid email address";
//     return "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched(true);
//     const validationError = validate(email);
//     setError(validationError);
//     if (validationError) {
//       showToast("error", validationError);
//       return;
//     }

//     setLoading(true);
//     try {
//       const resp = await fetch(`http:/localhost:5100/api/auth/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.trim().toLowerCase() }),
//       });
//       const data = await resp.json();

//       if (!resp.ok) {
//         // show server-provided message if exists
//         throw new Error(data.message || "Failed to request password reset");
//       }

//       // success
//       setSent(true);
//       showToast("success", data.message || "Reset instructions sent. Check your email.");
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       // Be polite: don't reveal whether address exists or not — but use server message if provided.
//       showToast("error", err.message || "Failed to send reset instructions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="min-h-screen bg-sky-200 flex items-center justify-center p-6 relative">

//     {/* Toast */}
//     {toast.show && (
//       <div
//         className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl animate-slide-in ${
//           toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//         }`}
//       >
//         {toast.type === "success" ? (
//           <IoCheckmarkCircle className="w-6 h-6" />
//         ) : (
//           <IoCloseCircle className="w-6 h-6" />
//         )}
//         <p className="font-medium">{toast.message}</p>
//       </div>
//     )}

//     {/* Center Card */}
//     <div className="relative w-full max-w-md text-center">

//       {/* Logo + Header */}
//       <a href="/">
//       <div className="inline-flex items-center justify-center gap-3 mb-5">
//         <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow">
//           <img src={logoicon} alt="logo" className="w-10 h-10 object-contain" />
//         </div>

//         <img src={logotext} alt="name logo" className="h-10 object-contain" />
//       </div>
//       </a>

//       <h2 className="text-3xl font-bold text-sky-600 mb-1">Forgot Password</h2>
//       <p className="text-sm text-sky-600 mb-6">Enter your email to receive reset instructions.</p>

//       {/* Card */}
//       <div className="w-full p-8 bg-white rounded-2xl shadow-xl border border-sky-300">

//         {!sent ? (
//           <form onSubmit={handleSubmit} className="space-y-6 text-sky-600">

//             <div className="text-left">
//               <label htmlFor="fp-email" className="block text-sm font-semibold text-sky-600 mb-1">
//                 Email Address
//               </label>

//               <input
//                 id="fp-email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (touched) setError(validate(e.target.value));
//                 }}
//                 onBlur={handleBlur}
//                 placeholder="you@example.com"
//                 className={`w-full px-4 py-3 rounded-lg bg-sky-50 border text-sky-700
//                   ${error && touched ? "border-red-400" : "border-sky-300"}`}
//               />

//               {error && touched && (
//                 <p className="text-xs text-red-500 mt-1">{error}</p>
//               )}
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-sky-700 disabled:opacity-60"
//               >
//                 {loading ? "Sending..." : "Send Reset Link"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-3 rounded-lg border border-sky-400 text-sky-600 hover:bg-sky-50"
//               >
//                 Back
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-6 text-sky-600">
//             <div className="text-center">
//               <div className="mx-auto w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-3">
//                 <IoCheckmarkCircle className="w-8 h-8 text-sky-600" />
//               </div>

//               <h3 className="text-lg font-semibold">Check your email</h3>
//               <p className="text-sm mt-1">
//                 Reset instructions have been sent to <span className="font-bold">{email}</span>
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/login")}
//                 className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700"
//               >
//                 Back to Login
//               </button>

//               <button
//                 onClick={() => {
//                   setSent(false);
//                   setEmail("");
//                   setTouched(false);
//                   setError("");
//                 }}
//                 className="px-4 py-3 rounded-lg border border-sky-400 text-sky-600 hover:bg-sky-50"
//               >
//                 Send Again
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <p className="text-sm text-sky-600 mt-4">
//         Remembered your password?{" "}
//         <button onClick={() => navigate("/login")} className="underline text-sky-700">
//           Sign In
//         </button>
//       </p>
//     </div>

//     <style jsx>{`
//       @keyframes slide-in {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//       }
//       .animate-slide-in {
//         animation: slide-in 0.28s ease-out;
//       }
//     `}</style>

//   </div>
// );

// };

// export default ForgotPassword;

// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import logoicon from "../images/LogoIcon.png";
import logotext from "../images/NameLogo.png";

const API = process.env.REACT_APP_API_URL || "http://localhost:5100";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [sent, setSent] = useState(false);

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(email));
  };

  const validate = (val) => {
    if (!val?.trim()) return "Email is required";
    if (!isValidEmail(val)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const validationError = validate(email);
    setError(validationError);
    if (validationError) {
      showToast("error", validationError);
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        // Use server-provided message if available
        throw new Error(data.message || "Failed to request password reset");
      }

      setSent(true);
      showToast("success", data.message || "Reset instructions sent. Check your email.");
    } catch (err) {
      console.error("Forgot password error:", err);
      // Be polite: don't reveal whether address exists or not — but show server message if provided
      showToast("error", err.message || "Failed to send reset instructions");
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

      {/* Background decorative blobs (pure CSS/Tailwind) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -top-10 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -right-24 bottom-10 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      </div>

      <div className="relative w-full max-w-md text-center z-10">
        <a href="/" className="inline-flex items-center justify-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow">
            {/* If you don't have an image, this <img> will fail gracefully */}
            <img src={logoicon} alt="logo" className="w-10 h-10 object-contain" />
          </div>
          <img src={logotext} alt="name logo" className="h-10 object-contain" />
        </a>

        <h2 className="text-3xl font-bold text-sky-700 mb-1">Forgot Password</h2>
        <p className="text-sm text-sky-700 mb-6">Enter your email to receive reset instructions.</p>

        {/* Frosted glass card */}
        <div className="mx-auto w-full p-8 rounded-2xl
                        backdrop-blur-[10px] bg-white/10 border border-white/30
                        shadow-2xl">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-sky-800">
              <div className="text-left">
                <label htmlFor="fp-email" className="block text-sm font-semibold text-sky-700 mb-1">
                  Email Address
                </label>

                <input
                  id="fp-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched) setError(validate(e.target.value));
                  }}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg bg-white/30 backdrop-filter backdrop-blur-sm border text-sky-900
                    ${error && touched ? "border-red-400" : "border-white/20"}`}
                />

                {error && touched && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="px-4 py-3 rounded-lg border border-white/30 text-white/90 hover:bg-white/10"
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-sky-700">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-3">
                  <IoCheckmarkCircle className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white">Check your email</h3>
                <p className="text-sm mt-1 text-white/90">
                  Reset instructions have been sent to <span className="font-bold">{email}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => navigate("/login")} className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700">
                  Back to Login
                </button>

                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                    setTouched(false);
                    setError("");
                  }}
                  className="px-4 py-3 rounded-lg border border-white/30 text-white/90 hover:bg-white/10"
                >
                  Send Again
                </button>
              </div>
            </div>
          )}
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

export default ForgotPassword;
