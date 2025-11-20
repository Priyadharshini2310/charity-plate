// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
// import logoicon from "../images/LogoIcon.png";
// import logotext from "../images/NameLogo.png";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: signup form, 2: OTP verification
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     email: '', 
//     password: '', 
//     confirmPassword: '',
//     role: 'donor'
//   });
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, type: '', message: '' });
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//     password: false,
//     confirmPassword: false
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const roles = [
//     { value: 'donor', label: 'Donor', icon: '💝', description: 'I want to donate food' },
//     { value: 'charity', label: 'Charity', icon: '🏥', description: 'I run a charity organization' },
//   ];

//   // Email validation
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Field validation
//   const validateField = (name, value) => {
//     let error = '';

//     switch (name) {
//       case 'name':
//         if (!value.trim()) {
//           error = 'Name is required';
//         } else if (value.trim().length < 2) {
//           error = 'Name must be at least 2 characters';
//         } else if (value.trim().length > 50) {
//           error = 'Name must be less than 50 characters';
//         }
//         break;

//       case 'email':
//         if (!value.trim()) {
//           error = 'Email is required';
//         } else if (!isValidEmail(value)) {
//           error = 'Please enter a valid email address';
//         }
//         break;

//       case 'password':
//         if (!value) {
//           error = 'Password is required';
//         } else if (value.length < 6) {
//           error = 'Password must be at least 6 characters';
//         } else if (value.length > 50) {
//           error = 'Password must be less than 50 characters';
//         }
//         break;

//       case 'confirmPassword':
//         if (!value) {
//           error = 'Please confirm your password';
//         } else if (value !== formData.password) {
//           error = 'Passwords do not match';
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
    
//     // Validate while typing if field has been touched
//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
      
//       // Also revalidate confirmPassword if password changes
//       if (name === 'password' && touched.confirmPassword) {
//         const confirmError = formData.confirmPassword !== value ? 'Passwords do not match' : '';
//         setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
//       }
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
//       setToast({ show: false, type: '', message: '' });
//     }, 4000);
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     // Mark all fields as touched
//     setTouched({ name: true, email: true, password: true, confirmPassword: true });

//     // Validate all fields
//     const nameError = validateField('name', formData.name);
//     const emailError = validateField('email', formData.email);
//     const passwordError = validateField('password', formData.password);
//     const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);

//     setErrors({
//       name: nameError,
//       email: emailError,
//       password: passwordError,
//       confirmPassword: confirmPasswordError,
//     });

//     // Check if there are any errors
//     if (nameError || emailError || passwordError || confirmPasswordError) {
//       showToast('error', emailError );
//       if(nameError){
//         showToast('error', nameError);
//       }
//       if(passwordError){
//         showToast('error', passwordError);
//       }
//       if(confirmPasswordError){
//         showToast('error', confirmPasswordError);
//       }
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('https://charityplatebe.vercel.app/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Signup failed');
//       }

//       // Move to OTP verification step
//       setStep(2);
//       showToast('success', 'OTP sent to your email! Please check your inbox.');
//     } catch (err) {
//       showToast('error', err.message || 'Failed to create account. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       showToast('error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('https://charityplatebe.vercel.app/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           otp: otp
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'OTP verification failed');
//       }

//       showToast('success', 'Account verified successfully! Redirecting to login...');
      
//       setTimeout(() => {
//         navigate('/login');
//       }, 1500);
//     } catch (err) {
//       showToast('error', err.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch('https://charityplatebe.vercel.app/api/auth/resend-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to resend OTP');
//       }

//       showToast('success', 'OTP resent successfully! Check your email.');
//     } catch (err) {
//       showToast('error', err.message || 'Failed to resend OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-sky-50 via-blue-50 to-pink-50">
//       {/* Toast Notification */}
//       {toast.show && (
//         <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm animate-slide-in ${
//           toast.type === 'success' 
//             ? 'bg-green-500 text-white' 
//             : 'bg-red-500 text-white'
//         }`}>
//           {toast.type === 'success' ? (
//             <IoCheckmarkCircle className="flex-shrink-0 w-6 h-6" />
//           ) : (
//             <IoCloseCircle className="flex-shrink-0 w-6 h-6" />
//           )}
//           <p className="font-medium">{toast.message}</p>
//         </div>
//       )}

//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#9cdbff] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//         <div className="absolute rounded-full bottom-1/4 -right-20 w-72 h-72 bg-sky-100 mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       </div>

//       <div className="relative w-full max-w-md">
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <a href="/" className="transition-opacity hover:opacity-80">
//               <div className="relative mb-4">
//                 <img src={logoicon} className="object-contain w-16 h-16" alt="Logo" />
//               </div>
//             </a>
//             <a href="/" className="transition-opacity hover:opacity-80">
//               <div className="flex items-center">
//                 <img src={logotext} className="object-contain h-16 w-52" alt="Name Logo" />
//               </div>
//             </a>
//           </div>
//           <h2 className="mb-2 text-3xl font-bold text-gray-900">
//             {step === 1 ? 'Create Account' : 'Verify Email'}
//           </h2>
//           <p className="text-gray-600">
//             {step === 1 ? 'Join us in making the world a better place' : 'Enter the OTP sent to your email'}
//           </p>
//         </div>

//         <div className="p-8 bg-white shadow-2xl rounded-2xl">
//           {step === 1 ? (
//             <form onSubmit={handleSignupSubmit} className="space-y-5">
//               {/* Role Selection */}
//               <div>
//                 <label className="block mb-3 text-sm font-medium text-gray-700">
//                   I am a...
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   {roles.map((role) => (
//                     <button
//                       key={role.value}
//                       type="button"
//                       onClick={() => setFormData({ ...formData, role: role.value })}
//                       className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
//                         formData.role === role.value
//                           ? 'border-[#56c1ff] bg-sky-50'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="text-sm font-semibold text-gray-900">{role.label}</div>
//                       <div className="mt-1 text-xs text-gray-500">{role.description}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Name Field */}
//               <div>
//                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none ${
//                       errors.name && touched.name
//                         ? 'border-red-500 focus:ring-red-500'
//                         : 'border-gray-300 focus:ring-sky-500'
//                     }`}
//                     placeholder="John Doe"
//                   />
//                   {errors.name && touched.name && (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {errors.name && touched.name && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="signup-email" className="block mb-2 text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="signup-email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none ${
//                       errors.email && touched.email
//                         ? 'border-red-500 focus:ring-red-500'
//                         : 'border-gray-300 focus:ring-sky-500'
//                     }`}
//                     placeholder="you@example.com"
//                   />
//                   {errors.email && touched.email ? (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                   ) : formData.email && isValidEmail(formData.email) && touched.email && (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {errors.email && touched.email && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="signup-password" className="block mb-2 text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="signup-password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none pr-12 ${
//                       errors.password && touched.password
//                         ? 'border-red-500 focus:ring-red-500'
//                         : 'border-gray-300 focus:ring-sky-500'
//                     }`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute text-gray-500 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
//                   >
//                     {showPassword ? "👁️" : "👁️‍🗨️"}
//                   </button>
//                 </div>
//                 {errors.password && touched.password && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="confirm-password"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 outline-none ${
//                       errors.confirmPassword && touched.confirmPassword
//                         ? 'border-red-500 focus:ring-red-500'
//                         : 'border-gray-300 focus:ring-sky-500'
//                     }`}
//                     placeholder="••••••••"
//                   />
//                   {errors.confirmPassword && touched.confirmPassword ? (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                   ) : formData.confirmPassword && formData.confirmPassword === formData.password && touched.confirmPassword && (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {errors.confirmPassword && touched.confirmPassword && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-[#56c1ff] text-white py-3 px-4 rounded-lg font-semibold hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Creating account...</span>
//                   </span>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleOtpSubmit} className="space-y-5">
//               <div className="mb-6 text-center">
//                 <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-sky-100">
//                   <span className="text-3xl">📧</span>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   We've sent a 6-digit OTP to<br />
//                   <span className="font-semibold text-gray-900">{formData.email}</span>
//                 </p>
//               </div>

//               <div>
//                 <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
//                   Enter OTP
//                 </label>
//                 <input
//                   id="otp"
//                   type="text"
//                   required
//                   maxLength="6"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                   className="w-full px-4 py-3 text-2xl tracking-widest text-center transition-all duration-200 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                   placeholder="000000"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-[#56c1ff] text-white py-3 px-4 rounded-lg font-semibold hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Verifying...</span>
//                   </span>
//                 ) : (
//                   'Verify OTP'
//                 )}
//               </button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={loading}
//                   className="text-sm text-[#56c1ff] hover:text-sky-500 font-medium disabled:opacity-50 transition-colors"
//                 >
//                   Resend OTP
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="w-full text-sm text-gray-600 transition-colors hover:text-gray-800"
//               >
//                 ← Back to signup
//               </button>
//             </form>
//           )}

//           {step === 1 && (
//             <p className="mt-6 text-sm text-center text-gray-600">
//               Already have an account?{' '}
//               <button
//                 onClick={() => navigate('/login')}
//                 className="font-medium text-[#56c1ff] hover:text-sky-400 transition-colors"
//               >
//                 Sign in
//               </button>
//             </p>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
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
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import logoicon from "../images/LogoIcon.png";
import logotext from "../images/NameLogo.png";
import ParticlesComponent from "ui/particle";

const API_URL = "https://charityplatebe.vercel.app/api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = signup form, 2 = OTP
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const roles = [
    { value: "donor", label: "Donor",  description: "I want to donate food" },
    { value: "charity", label: "Charity",  description: "I run a charity organization" },
  ];

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name, value) => {
    if (name === "name")
      return !value.trim()
        ? "Name is required"
        : value.trim().length < 2
        ? "Name must be at least 2 characters"
        : value.trim().length > 50
        ? "Name too long"
        : "";
    if (name === "email")
      return !value.trim()
        ? "Email is required"
        : !isValidEmail(value)
        ? "Invalid email address"
        : "";
    if (name === "password")
      return !value
        ? "Password is required"
        : value.length < 6
        ? "Password must be at least 6 characters"
        : "";
    if (name === "confirmPassword")
      return !value
        ? "Please confirm password"
        : value !== formData.password
        ? "Passwords do not match"
        : "";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });

      if (name === "password" && touched.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: value !== formData.confirmPassword ? "Passwords do not match" : "",
        }));
      }
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

  // Fixed function names below
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      Object.values(newErrors).forEach((err) => err && showToast("error", err));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setStep(2);
      showToast("success", "OTP sent to your email!");
    } catch (err) {
      showToast("error", err.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return showToast("error", "Enter a valid 6-digit OTP");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      showToast("success", "Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      showToast("error", err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");
      showToast("success", "OTP resent successfully!");
    } catch (err) {
      showToast("error", err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Particles + Blur Background */}
      <div className="fixed inset-0 -z-10">
        <ParticlesComponent id="particles-js" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>

      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white animate-pulse ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? <IoCheckmarkCircle className="w-6 h-6" /> : <IoCloseCircle className="w-6 h-6" />}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="/"><img src={logoicon} alt="Logo" className="object-contain w-16 h-16" /></a>
            <a href="/"><img src={logotext} alt="Name Logo" className="object-contain h-16" /></a>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            {step === 1 ? "Create Account" : "Verify Email"}
          </h1>
          <p className="mt-2 text-gray-600">
            {step === 1 ? "Join us in making a difference" : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="p-8 border shadow-2xl bg-white/20 backdrop-blur-lg border-white/30 rounded-2xl">
            {step === 1 ? (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3L3">I am a...</label>
                  <div className="grid grid-cols-2 gap-4">
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: r.value })}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${
                          formData.role === r.value
                            ? "border-sky-500 bg-sky-50/50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{r.label}</div>
                        <div className="mt-1 text-xs text-gray-600">{r.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name, Email, Password, Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name && touched.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:ring-2 focus:border-transparent outline-none transition`}
                  />
                  {errors.name && touched.name && <p className="flex items-center gap-1 mt-2 text-sm text-red-600">⚠️ {errors.name}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email && touched.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:ring-2 focus:border-transparent outline-none transition`}
                  />
                  {errors.email && touched.email && <p className="flex items-center gap-1 mt-2 text-sm text-red-600">⚠️ {errors.email}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.password && touched.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:ring-2 focus:border-transparent outline-none transition`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-gray-600 -translate-y-1/2 right-3 top-1/2 hover:text-gray-900"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && touched.password && <p className="flex items-center gap-1 mt-2 text-sm text-red-600">⚠️ {errors.password}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword && touched.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:ring-2 focus:border-transparent outline-none transition`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && <p className="flex items-center gap-1 mt-2 text-sm text-red-600">⚠️ {errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r bg-sky-600 hover:to-sky-700 text-white font-semibold py-3.5 rounded-lg transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            ) : (
              /* OTP Screen - unchanged */
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-sky-100">
                    <span className="text-4xl">📧</span>
                  </div>
                  <p className="text-gray-600">
                    Enter the 6-digit code sent to<br />
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </p>
                </div>

                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full px-4 py-4 text-3xl text-center border border-gray-300 rounded-lg outline-none tracking-widedest focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r bg-sky-600 hover:to-sky-700 text-white font-semibold py-3.5 rounded-lg transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="space-y-3 text-center">
                  <button type="button" onClick={handleResendOtp} disabled={loading} className="font-medium text-sky-500 hover:text-sky-600">
                    Resend OTP
                  </button>
                  <br />
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-600 hover:text-gray-800">
                    ← Back to Signup
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <p className="mt-8 text-center text-gray-700">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="font-semibold text-blue-400 hover:text-blue-500">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;