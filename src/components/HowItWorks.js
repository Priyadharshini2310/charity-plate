// // File: frontend/src/components/HowItWorks.js
// import React from 'react';
// import { HoverEffect } from "../components/ui/card-hover-effect";

// export function HowItWorks() {
//   const howItWorksItems = [
//     {
//       title: "Find a Cause",
//       description: "Browse a wide range of vetted charities by cause, location, or mission.",
//       link: "#"
//     },
//     {
//       title: "Donate Securely",
//       description: "Make a one-time or recurring donation with confidence using our secure payment gateway.",
//       link: "#"
//     },
//     {
//       title: "Track Your Impact",
//       description: "Receive transparent updates and reports showing how your donation is making a difference.",
//       link: "#"
//     },
//   ];

//   return (
//     <section id="how-it-works" className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:text-center">
//           <h2 className="text-base font-semibold leading-7 text-sky-600">Simplicity is Key</h2>
//           <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             It only takes three simple steps to make a difference
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Our streamlined process ensures your donations are fast, secure, and transparent.
//           </p>
//         </div>
//         <div className="mx-auto mt-16 max-w-5xl">
//           <HoverEffect items={howItWorksItems} />
//         </div>
//       </div>
//     </section>
//   );
// }
// import React from 'react';

// // Enhanced Card Hover Effect Component
// const HoverEffect = ({ items }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
//         >
//           {/* Background gradient on hover */}
//           <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-purple-50/0 group-hover:from-sky-50/50 group-hover:to-purple-50/50 transition-all duration-500 rounded-2xl"></div>
          
//           {/* Step number */}
//           <div className="relative z-10 mb-6">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
//               {idx + 1}
//             </div>
//           </div>
          
//           {/* Content */}
//           <div className="relative z-10">
//             <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-sky-700 transition-colors duration-300">
//               {item.title}
//             </h3>
//             <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//               {item.description}
//             </p>
//           </div>
          
//           {/* Decorative elements */}
//           <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-sky-100/20 to-purple-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export function HowItWorks() {
//   const howItWorksItems = [
//     {
//       title: "Find Nearby Charities",
//       description: "Discover verified charity trusts in your area with real-time meal requirements and timings for breakfast, lunch, and dinner.",
//       link: "#"
//     },
//     {
//       title: "Choose Your Donation",
//       description: "Select the number of plates you want to donate using our simple interface, just like ordering food online.",
//       link: "#"
//     },
//     {
//       title: "Make the Delivery",
//       description: "Get instant location details and contact information to deliver your food donation directly to those in need.",
//       link: "#"
//     },
//   ];

//   return (
//     <section id="how-it-works" className="relative bg-white py-24 sm:py-32 overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-sky-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-indigo-100/40 to-pink-100/40 rounded-full blur-3xl"></div>
      
//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="mx-auto max-w-3xl text-center">
//           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-50 to-purple-50 border border-sky-200/50 rounded-full mb-6">
//             <svg className="w-5 h-5 text-sky-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//             </svg>
//             <span className="text-sm font-semibold text-sky-700">Simplicity is Key</span>
//           </div>
          
//           <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
//             It only takes{' '}
//             <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
//               three simple steps
//             </span>{' '}
//             to make a difference
//           </h2>
          
//           <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
//             Our streamlined food donation process connects you directly with local charity trusts, ensuring your contribution reaches those who need it most.
//           </p>
//         </div>

//         {/* Cards Section */}
//         <div className="mx-auto mt-20 max-w-6xl">
//           <HoverEffect items={howItWorksItems} />
//         </div>

//         {/* Call to Action */}
//         <div className="mt-20 text-center">
//           <div className="inline-flex flex-col sm:flex-row gap-4">
//             <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300">
//               Start Donating Now
//             </button>
//             <button className="px-8 py-4 bg-white text-gray-700 font-semibold border-2 border-gray-200 rounded-xl hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50/50 transition-all duration-300">
//               Learn More About Us
//             </button>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
//           <div className="text-center group">
//             <div className="text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
//               50+
//             </div>
//             <div className="text-sm text-gray-600 mt-1">Verified Charities</div>
//           </div>
//           <div className="text-center group">
//             <div className="text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
//               10,000+
//             </div>
//             <div className="text-sm text-gray-600 mt-1">Meals Donated</div>
//           </div>
//           <div className="text-center group">
//             <div className="text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
//               1,000+
//             </div>
//             <div className="text-sm text-gray-600 mt-1">Happy Donors</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React from 'react';
import { HoverBorderGradientDemo } from './HoverBorder';
// Enhanced Card Hover Effect Component
const HoverEffect = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
        >
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-sky-50/0 group-hover:from-sky-50/50 group-hover:to-sky-50/50 transition-all duration-500 rounded-2xl"></div>
          
          {/* Step number */}
          <div className="relative z-10 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              {idx + 1}
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-sky-700 transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {item.description}
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-sky-100/20 to-sky-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-sky-100/20 to-sky-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      ))}
    </div>
  );
};

export function HowItWorks() {
  const howItWorksItems = [
    {
      title: "Find Nearby Charities",
      description: "Discover verified charity trusts in your area with real-time meal requirements and timings for breakfast, lunch, and dinner.",
      link: "#"
    },
    {
      title: "Choose Your Donation",
      description: "Select the number of plates you want to donate using our simple interface, just like ordering food online.",
      link: "#"
    },
    {
      title: "Make the Delivery",
      description: "Get instant location details and contact information to deliver your food donation directly to those in need.",
      link: "#"
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-sky-100/30 to-sky-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-sky-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          
          <HoverBorderGradientDemo/>
          
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            It only takes{' '}
            <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
              three simple steps
            </span>{' '}
            to make a difference
          </h2>
          
          <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Our streamlined food donation process connects you directly with local charity trusts, ensuring your contribution reaches those who need it most.
          </p>
        </div>

        {/* Cards Section */}
        <div className="mx-auto mt-20 max-w-6xl">
          <HoverEffect items={howItWorksItems} />
        </div>

        {/* Call to Action */}
        {/* <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-sky-700 transform hover:-translate-y-1 transition-all duration-300">
              Start Donating Now
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 font-semibold border-2 border-gray-200 rounded-xl hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50/50 transition-all duration-300">
              Learn More About Us
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}