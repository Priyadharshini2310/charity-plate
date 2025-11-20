// import React, { useState, useEffect, useRef } from "react";
// import { TbMoneybag } from "react-icons/tb";
// import { MdOutlineVerifiedUser } from "react-icons/md";
// import { FaHandHoldingHeart } from "react-icons/fa";
// import { HoverBorderGradientDemo } from "./HoverBorder";
// import { HoverBorder } from "./Hover";
// const AnimatedNumber = ({ end, duration = 2000, suffix = "", prefix = "", isVisible }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!isVisible) return;

//     let startTime = null;

//     const animate = (currentTime) => {
//       if (!startTime) startTime = currentTime;
//       const progress = (currentTime - startTime) / duration;

//       if (progress < 1) {
//         const easeOutQuart = 1 - Math.pow(1 - progress, 4);
//         setCount(Math.floor(easeOutQuart * end));
//         requestAnimationFrame(animate);
//       } else {
//         setCount(end);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [isVisible, end, duration]);

//   const formatNumber = (num) => {
//     return num.toLocaleString();
//   };

//   return (
//     <span>
//       {prefix}
//       {formatNumber(count)}
//       {suffix}
//     </span>
//   );
// };

// export default function ImpactStatistics() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !isVisible) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [isVisible]);

//   const stats = [
//     {
//       value: 10,
//       suffix: "M+",
//       label: "Total Funds Raised",
//       prefix: "$",
//       icon: <TbMoneybag className="text-yellow-500" />,
      
//     },
//     {
//       value: 500,
//       suffix: "+",
//       label: "Verified Charities",
//       prefix: "",
//       icon: <MdOutlineVerifiedUser className="text-blue-600" />,
      
//     },
//     {
//       value: 10000,
//       suffix: "+",
//       label: "Active Donors",
//       prefix: "",
//       icon: <FaHandHoldingHeart className="text-red-600" />,
      
//     },
//   ];

//   return (
//     <section 
//       id="impact" 
//       ref={sectionRef} 
//       className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-24 overflow-hidden"
//     >
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:max-w-none">
//           <div className="text-center mb-20">
//             <div 
//               className="inline-block mb-4"
//               style={{
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? "scale(1)" : "scale(0.9)",
//                 transition: "all 0.6s ease-out"
//               }}
//             >
//               {/* <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg">
//                 <span className="animate-pulse"></span>
                
//               </span> */}
//               <HoverBorder/>
//             </div>
//             <h2 
//               className="text-5xl font-extrabold text-gray-900 sm:text-6xl mb-6"
//               style={{
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? "translateY(0)" : "translateY(20px)",
//                 transition: "all 0.6s ease-out 0.2s"
//               }}
//             >
//               Our Impact So Far
//             </h2>
//             <p 
//               className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto"
//               style={{
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? "translateY(0)" : "translateY(20px)",
//                 transition: "all 0.6s ease-out 0.3s"
//               }}
//             >
//               Join a community of compassionate givers and witness the power of collective action creating real change.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="group relative"
//                 style={{
//                   opacity: isVisible ? 1 : 0,
//                   transform: isVisible ? "translateY(0)" : "translateY(40px)",
//                   transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 + index * 0.15}s`,
//                 }}
//               >
//                 <div className="relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:-translate-y-2">
//                   {/* Gradient overlay on hover */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
//                   {/* Icon */}
//                   <div className={`relative text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
//                     {stat.icon}
//                   </div>

//                   {/* Number */}
//                   <p className={`relative text-6xl font-black text-gray-900 tracking-tight mb-3`}>
//                     <AnimatedNumber
//                       end={stat.value}
//                       duration={2500}
//                       suffix={stat.suffix}
//                       prefix={stat.prefix}
//                       isVisible={isVisible}
//                     />
//                   </p>

//                   {/* Label */}
//                   <p className="relative text-lg font-semibold text-gray-700 text-center">
//                     {stat.label}
//                   </p>

//                   {/* Decorative corner element */}
//                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Call to action */}
          
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useState, useEffect, useRef, JSX } from "react";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { HoverBorderGradientDemo } from "../HoverBorder";
import { HoverBorder } from "../Hover";

// Types
interface AnimatedNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  isVisible: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ end, duration = 2000, suffix = "", prefix = "", isVisible }) => {
  const [count, setCount] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

// Stats type
interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  prefix?: string;
  icon: React.ReactNode;
  gradient?: string; // tailwind gradient classes
}

export default function ImpactStatistics(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  const stats: StatItem[] = [
    {
      value: 10,
      suffix: "L+",
      label: "Total Funds Raised",
      prefix: "₹",
      icon: <TbMoneybag className="text-yellow-500" />,
      gradient: "from-yellow-50 to-yellow-100",
    },
    {
      value: 500,
      suffix: "+",
      label: "Verified Charities",
      prefix: "",
      icon: <MdOutlineVerifiedUser className="text-blue-600" />,
      gradient: "from-blue-50 to-blue-100",
    },
    {
      value: 10000,
      suffix: "+",
      label: "Active Donors",
      prefix: "",
      icon: <FaHandHoldingHeart className="text-red-600" />,
      gradient: "from-pink-50 to-pink-100",
    },
  ];

  return (
    <section
      id="impact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-24 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center mb-20">
            <div
              className="inline-block mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.9)",
                transition: "all 0.6s ease-out",
              }}
            >
              <HoverBorder />
            </div>

            <h2
              className="text-5xl font-extrabold text-gray-900 sm:text-6xl mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              Our Impact So Far
            </h2>

            <p
              className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.3s",
              }}
            >
              Join a community of compassionate givers and witness the power of collective action creating real change.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 + index * 0.15}s`,
                }}
              >
                <div className="relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Icon */}
                  <div className={`relative text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <p className={`relative text-6xl font-black text-gray-900 tracking-tight mb-3`}>
                    <AnimatedNumber end={stat.value} duration={2500} suffix={stat.suffix} prefix={stat.prefix} isVisible={isVisible} />
                  </p>

                  {/* Label */}
                  <p className="relative text-lg font-semibold text-gray-700 text-center">{stat.label}</p>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
        </div>
      </div>
    </section>
  );
}