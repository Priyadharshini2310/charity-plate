// import React, { useState } from 'react';
// import axios from 'axios';
// import { IoSend } from "react-icons/io5";
// import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

// const API_URL = 'https://charityplatebe.vercel.app/api/feedback';
// const MAX_MESSAGE_LENGTH = 250;

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rating: 5,
//     message: '',
//   });
  
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
  
//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//     message: false,
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [toast, setToast] = useState({ show: false, type: '', message: '' });

//   // Email validation regex
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Real-time validation
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

//       case 'message':
//         if (!value.trim()) {
//           error = 'Message is required';
//         } else if (value.trim().length < 10) {
//           error = 'Message must be at least 10 characters';
//         } else if (value.length > MAX_MESSAGE_LENGTH) {
//           error = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
//         }
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Prevent exceeding max length for message
//     if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
    
//     // Validate while typing if field has been touched
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
//       setToast({ show: false, type: '', message: '' });
//     }, 4000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Mark all fields as touched
//     setTouched({ name: true, email: true, message: true });

//     // Validate all fields
//     const nameError = validateField('name', formData.name);
//     const emailError = validateField('email', formData.email);
//     const messageError = validateField('message', formData.message);

//     setErrors({
//       name: nameError,
//       email: emailError,
//       message: messageError,
//     });

//     // Check if there are any errors
//     if (nameError || emailError || messageError) {
//       showToast('error', nameError, emailError, messageError);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(API_URL, formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log('Feedback submitted:', response.data);
      
//       showToast('success', 'Thank you! Your feedback has been submitted successfully.');
      
//       // Reset form after success
//       setTimeout(() => {
//         setFormData({
//           name: '',
//           email: '',
//           rating: 5,
//           message: '',
//         });
//         setTouched({ name: false, email: false, message: false });
//         setErrors({ name: '', email: '', message: '' });
//       }, 1000);
      
//     } catch (err) {
//       console.error('Submission Error:', err.response ? err.response.data : err.message);
//       const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to submit feedback. Please try again.';
//       showToast('error', errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-white">
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

//       <div className="relative w-full max-w-lg p-8 overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
//         {/* Decorative background elements */}
//         <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-sky-200/20 to-sky-200/20"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-sky-200/20 to-sky-200/20"></div>
        
//         <div className="relative z-10">
//           <div className="mb-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-sky-500 to-sky-600">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//               </svg>
//             </div>
//             <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
//               Your Feedback Matters
//             </h2>
//             <p className="tracking-tighter text-gray-600">
//               Help us improve our service by sharing your valuable thoughts with us.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name Field */}
//             <div className="group">
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your full name"
//                   className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 group-hover:border-gray-300 ${
//                     errors.name && touched.name
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-200 focus:border-sky-500'
//                   }`}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   {errors.name && touched.name ? (
//                     <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                     </svg>
//                   )}
//                 </div>
//               </div>
//               {errors.name && touched.name && (
//                 <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                   </svg>
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="group">
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="your.email@example.com"
//                   className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 group-hover:border-gray-300 ${
//                     errors.email && touched.email
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-200 focus:border-sky-500'
//                   }`}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   {errors.email && touched.email ? (
//                     <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   ) : formData.email && isValidEmail(formData.email) && touched.email ? (
//                     <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                     </svg>
//                   )}
//                 </div>
//               </div>
//               {errors.email && touched.email && (
//                 <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                   </svg>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Rating Field */}
//             <div>
//               <div className="flex items-center justify-center p-4 space-x-2 border-2 border-gray-200 bg-gray-50/50 rounded-xl">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setFormData({ ...formData, rating: star })}
//                     className={`text-3xl transition-all duration-300 transform hover:scale-125 ${
//                       star <= formData.rating 
//                         ? 'text-yellow-400 drop-shadow-lg' 
//                         : 'text-gray-300 hover:text-yellow-300'
//                     }`}
//                   >
//                     ★
//                   </button>
//                 ))}
//               </div>
//               <p className="mt-2 text-xs text-center text-gray-500">
//                 {formData.rating === 1 && "Poor"}
//                 {formData.rating === 2 && "Fair"}
//                 {formData.rating === 3 && "Good"}
//                 {formData.rating === 4 && "Very Good"}
//                 {formData.rating === 5 && "Excellent"}
//               </p>
//             </div>

//             {/* Message Field */}
//             <div className="group">
//               <div className="relative">
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Share your thoughts, suggestions, or any feedback you have for us..."
//                   className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 resize-none group-hover:border-gray-300 ${
//                     errors.message && touched.message
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-200 focus:border-sky-500'
//                   }`}
//                 />
//               </div>
//               <div className="flex justify-between items-center mt-1.5">
//                 {errors.message && touched.message ? (
//                   <p className="flex items-center gap-1 text-sm text-red-600">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     {errors.message}
//                   </p>
//                 ) : (
//                   <div></div>
//                 )}
//                 <p className={`text-xs ${
//                   formData.message.length > MAX_MESSAGE_LENGTH - 20 
//                     ? 'text-red-600 font-semibold' 
//                     : 'text-gray-500'
//                 }`}>
//                   {formData.message.length}/{MAX_MESSAGE_LENGTH}
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Submitting...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Submit Feedback</span>
//                   <IoSend/>
//                 </>
//               )}
//             </button>
//           </form>
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

// export default FeedbackForm;
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSend, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

const API_URL = 'https://charityplatebe.vercel.app/api/feedback';
const MAX_MESSAGE_LENGTH = 250;

// Types
interface FormData {
  name: string;
  email: string;
  rating: number;
  message: string;
}

interface Errors {
  name: string;
  email: string;
  message: string;
}

interface Touched {
  name: boolean;
  email: boolean;
  message: boolean;
}

interface Toast {
  show: boolean;
  type: 'success' | 'error' | '';
  message: string;
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateField = (name: keyof FormData, value: string) => {
  let error = '';

  switch (name) {
    case 'name':
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      } else if (value.trim().length > 50) {
        error = 'Name must be less than 50 characters';
      }
      break;

    case 'email':
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!isValidEmail(value)) {
        error = 'Please enter a valid email address';
      }
      break;

    case 'message':
      if (!value.trim()) {
        error = 'Message is required';
      } else if (value.trim().length < 10) {
        error = 'Message must be at least 10 characters';
      } else if (value.length > MAX_MESSAGE_LENGTH) {
        error = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
      }
      break;

    default:
      break;
  }

  return error;
};

const FeedBack: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    rating: 5,
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Touched>({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast>({ show: false, type: '', message: '' });

  // Real-time validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if ((touched as any)[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const showToast = (type: Toast['type'], message: string) => {
    setToast({ show: true, type, message });
    window.setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    setErrors({ name: nameError, email: emailError, message: messageError });

    if (nameError || emailError || messageError) {
      // Combine errors into a single message for the toast
      const combined = [nameError, emailError, messageError].filter(Boolean).join(' — ');
      showToast('error', combined || 'Please correct the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Feedback submitted:', response.data);
      showToast('success', 'Thank you! Your feedback has been submitted successfully.');

      // Reset form after success
      window.setTimeout(() => {
        setFormData({ name: '', email: '', rating: 5, message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
      }, 1000);
    } catch (err: any) {
      console.error('Submission Error:', err?.response ?? err.message ?? err);
      const errorMessage = err?.response?.data?.error || err?.response?.data?.message || 'Failed to submit feedback. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm animate-slide-in ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <IoCheckmarkCircle className="flex-shrink-0 w-6 h-6" />
          ) : (
            <IoCloseCircle className="flex-shrink-0 w-6 h-6" />
          )}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      <div className="relative w-full max-w-lg p-8 overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-sky-200/20 to-sky-200/20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-sky-200/20 to-sky-200/20"></div>

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-sky-500 to-sky-600">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">Your Feedback Matters</h2>
            <p className="tracking-tighter text-gray-600">Help us improve our service by sharing your valuable thoughts with us.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 group-hover:border-gray-300 ${
                    errors.name && touched.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-sky-500'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {errors.name && touched.name ? (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  )}
                </div>
              </div>
              {errors.name && touched.name && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="group">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 group-hover:border-gray-300 ${
                    errors.email && touched.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-sky-500'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {errors.email && touched.email ? (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ) : formData.email && isValidEmail(formData.email) && touched.email ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  )}
                </div>
              </div>
              {errors.email && touched.email && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Rating Field */}
            <div>
              <div className="flex items-center justify-center p-4 space-x-2 border-2 border-gray-200 bg-gray-50/50 rounded-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    className={`text-3xl transition-all duration-300 transform hover:scale-125 ${
                      star <= formData.rating ? 'text-yellow-400 drop-shadow-lg' : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-center text-gray-500">
                {formData.rating === 1 && 'Poor'}
                {formData.rating === 2 && 'Fair'}
                {formData.rating === 3 && 'Good'}
                {formData.rating === 4 && 'Very Good'}
                {formData.rating === 5 && 'Excellent'}
              </p>
            </div>

            {/* Message Field */}
            <div className="group">
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share your thoughts, suggestions, or any feedback you have for us..."
                  className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder-gray-400 resize-none group-hover:border-gray-300 ${
                    errors.message && touched.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-sky-500'
                  }`}
                />
              </div>
              <div className="flex justify-between items-center mt-1.5">
                {errors.message && touched.message ? (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    {errors.message}
                  </p>
                ) : (
                  <div></div>
                )}
                <p className={`text-xs ${
                  formData.message.length > MAX_MESSAGE_LENGTH - 20 ? 'text-red-600 font-semibold' : 'text-gray-500'
                }`}>
                  {formData.message.length}/{MAX_MESSAGE_LENGTH}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Feedback</span>
                  <IoSend />
                </>
              )}
            </button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;

const styles = `
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
