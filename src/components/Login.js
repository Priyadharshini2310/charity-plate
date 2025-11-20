// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
// import logoicon from "../images/LogoIcon.png";
// import logotext from "../images/NameLogo.png";
// import ParticlesComponent from "ui/particle";
// const API = process.env.REACT_APP_API_URL || "http://localhost:5100";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [toast, setToast] = useState({ show: false, type: "", message: "" });
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [touched, setTouched] = useState({ email: false, password: false });

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateField = (name, value) => {
//     let error = "";
//     switch (name) {
//       case "email":
//         if (!value.trim()) {
//           error = "Email is required";
//         } else if (!isValidEmail(value)) {
//           error = "Please enter a valid email address";
//         }
//         break;
//       case "password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 6) {
//           error = "Password must be at least 6 characters";
//         }
//         break;
//       default:
//         break;
//     }
//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const error = validateField(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//     setTimeout(() => {
//       setToast({ show: false, type: "", message: "" });
//     }, 4000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });

//     const emailError = validateField("email", formData.email);
//     const passwordError = validateField("password", formData.password);
//     setErrors({ email: emailError, password: passwordError });

//     if (emailError || passwordError) {
//       if (emailError) {
//         showToast("error", emailError);
//       }
//       if (passwordError) {
//         showToast("error", passwordError);
//       }
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Login attempt", { email: formData.email });
//       const response = await fetch(`${API}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Login response", data);

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       showToast("success", `Welcome back, ${data.user.name || "User"}!`);

//       // Role-based navigation
//       setTimeout(() => {
//         if (data.user.role === "charity") {
//           navigate("/charity-dashboard");
//         } else {
//           navigate("/dashboard");
//         }
//       }, 1500);
//     } catch (err) {
//       console.error("Login error:", err);
//       showToast(
//         "error",
//         err.message || "Invalid email or password. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex-row items-center justify-center w-full h-screen bg-white/30">
//       <div className="absolute inset-0 -z-10">
//         <ParticlesComponent id="particles-js" />
//       </div>
//       {toast.show && (
//         <div
//           className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm animate-slide-in ${
//             toast.type === "success"
//               ? "bg-green-500 text-white"
//               : "bg-red-500 text-white"
//           }`}
//         >
//           {toast.type === "success" ? (
//             <IoCheckmarkCircle className="flex-shrink-0 w-6 h-6" />
//           ) : (
//             <IoCloseCircle className="flex-shrink-0 w-6 h-6" />
//           )}
//           <p className="font-medium">{toast.message}</p>
//         </div>
//       )}
//       <div className="mb-8 text-center animate-fade-in">
//         <div className="inline-flex items-center gap-2 mb-4">
//           <a href="/" className="transition-opacity hover:opacity-80">
//             <div className="relative mb-4">
//               <img
//                 src={logoicon}
//                 className="object-contain w-16 h-16"
//                 alt="Logo Icon"
//               />
//             </div>
//           </a>
//           <a href="/" className="transition-opacity hover:opacity-80">
//             <div className="flex items-center">
//               <img
//                 src={logotext}
//                 className="object-contain h-16 w-52"
//                 alt="Name Logo"
//               />
//             </div>
//           </a>
//         </div>

//         <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h2>
//         <p className="text-gray-600">Sign in to continue making a difference</p>
//       </div>
//       <div
//         className="relative w-[380px] p-10 rounded-2xl items-center
//   backdrop-blur-[15px]
//   bg-white/10
//   border border-white/40
//   shadow-[0_25px_45px_rgba(0,0,0,0.4)]
//   z-10
//   overflow-hidden  animate-slide-up"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none ${
//                   errors.email && touched.email
//                     ? "border-red-500 focus:ring-red-500"
//                     : "border-gray-300 focus:ring-indigo-500"
//                 }`}
//                 placeholder="you@example.com"
//               />
//               {errors.email && touched.email && (
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <svg
//                     className="w-5 h-5 text-red-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//               )}
//             </div>
//             {errors.email && touched.email && (
//               <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                 <svg
//                   className="w-4 h-4"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none pr-12 ${
//                   errors.password && touched.password
//                     ? "border-red-500 focus:ring-red-500"
//                     : "border-gray-300 focus:ring-indigo-500"
//                 }`}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute text-gray-500 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
//                 title={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? "👁️" : "👁️‍🗨️"}
//               </button>
//             </div>
//             {errors.password && touched.password && (
//               <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                 <svg
//                   className="w-4 h-4"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
//               />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <a
//               href="/forgot-password"
//               className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
//             >
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg
//                   className="w-5 h-5 animate-spin"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 <span>Signing in...</span>
//               </span>
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-600">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-500"
//           >
//             Sign up for free
//           </button>
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes slide-in {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//         .animate-slide-up {
//           animation: slide-up 0.6s ease-out 0.2s both;
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import logoicon from "../images/LogoIcon.png";
import logotext from "../images/NameLogo.png";
import ParticlesComponent from "ui/particle";

const API = process.env.REACT_APP_API_URL || "http://localhost:5100";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!isValidEmail(value)) return "Please enter a valid email address";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark fields as touched
    setTouched({ email: true, password: true });

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      emailError && showToast("error", emailError);
      passwordError && showToast("error", passwordError);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast("success", `Welcome back, ${data.user.name || "User"}!`);

      setTimeout(() => {
        navigate(data.user.role === "charity" ? "/charity-dashboard" : "/dashboard");
      }, 1500);
    } catch (err) {
      showToast("error", err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background with Particles + Blur Overlay */}
      <div className="fixed inset-0 -z-10">
        <ParticlesComponent id="particles-js" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white animate-pulse ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <IoCheckmarkCircle className="w-6 h-6" />
          ) : (
            <IoCloseCircle className="w-6 h-6" />
          )}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      {/* Perfectly Centered Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo & Title */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="/">
              <img src={logoicon} alt="Logo Icon" className="object-contain w-16 h-16" />
            </a>
            <a href="/">
              <img src={logotext} alt="Name Logo" className="object-contain h-16" />
            </a>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue making a difference</p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="w-full max-w-md">
          <div className="p-8 border shadow-2xl bg-white/20 backdrop-blur-lg border-white/30 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  } focus:ring-2 focus:border-transparent outline-none transition`}
                />
                {errors.email && touched.email && (
                  <p className="flex items-center gap-1 mt-2 text-sm text-red-600">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                      errors.password && touched.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    } focus:ring-2 focus:border-transparent outline-none transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-600 -translate-y-1/2 right-3 top-1/2 hover:text-gray-900"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="flex items-center gap-1 mt-2 text-sm text-red-600">
                    <span>⚠️</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-sky-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r bg-sky-600 hover:to-sky-500 text-white font-semibold py-3.5 rounded-lg transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0 known..." className="opacity-75" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-700">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-semibold text-sky-500 hover:text-sky-500"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;