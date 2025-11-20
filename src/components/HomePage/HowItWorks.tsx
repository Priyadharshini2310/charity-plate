
// "use client";
// import React from 'react';
// import { HoverBorderGradientDemo } from './HoverBorder';
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
//           <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-sky-50/0 group-hover:from-sky-50/50 group-hover:to-sky-50/50 transition-all duration-500 rounded-2xl"></div>
          
//           {/* Step number */}
//           <div className="relative z-10 mb-6">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
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
//           <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-sky-100/20 to-sky-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-sky-100/20 to-sky-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
//     <section id="how-it-works" className="relative bg-white overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-sky-100/30 to-sky-100/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-sky-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
      
//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="mx-auto max-w-3xl text-center">
          
//           <HoverBorderGradientDemo/>
          
//           <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
//             It only takes{' '}
//             <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
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

//       </div>
//     </section>
//   );
// }
"use client";
import React from 'react';
import { HoverBorderGradientDemo } from '../HoverBorder';

// Types
interface HowItWorksItem {
  title: string;
  description: string;
  link?: string;
}

interface HoverEffectProps {
  items: HowItWorksItem[];
}

// Enhanced Card Hover Effect Component
const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
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

export const HowItWorks: React.FC = () => {
  const howItWorksItems: HowItWorksItem[] = [
    {
      title: "Find Nearby Charities",
      description:
        "Discover verified charity trusts in your area with real-time meal requirements and timings for breakfast, lunch, and dinner.",
      link: "#",
    },
    {
      title: "Choose Your Donation",
      description:
        "Select the number of plates you want to donate using our simple interface, just like ordering food online.",
      link: "#",
    },
    {
      title: "Make the Delivery",
      description:
        "Get instant location details and contact information to deliver your food donation directly to those in need.",
      link: "#",
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
          <HoverBorderGradientDemo />

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
      </div>
    </section>
  );
};
