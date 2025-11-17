// "use client";
// import React, { useState, useEffect } from "react";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export function HoverBorderGradient({
//   children,
//   containerClassName,
//   className,
//   as: Tag = "button",
//   duration = 1,
//   clockwise = true,
//   ...props
// }) {
//   const [hovered, setHovered] = useState(false);
//   const [direction, setDirection] = useState("TOP");

//   const rotateDirection = currentDirection => {
//     const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
//     const currentIndex = directions.indexOf(currentDirection);
//     const nextIndex = clockwise
//       ? (currentIndex - 1 + directions.length) % directions.length
//       : (currentIndex + 1) % directions.length;
//     return directions[nextIndex];
//   };

//   const movingMap = {
//     TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     BOTTOM:
//       "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     RIGHT:
//       "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//   };

//   const highlight =
//     "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

//   useEffect(() => {
//     if (!hovered) {
//       const interval = setInterval(() => {
//         setDirection((prevState) => rotateDirection(prevState));
//       }, duration * 1000);
//       return () => clearInterval(interval);
//     }
//   }, [hovered]);
//   return (
//     <Tag
//       onMouseEnter={(event) => {
//         setHovered(true);
//       }}
//       onMouseLeave={() => setHovered(false)}
//       className={cn(
//         "relative flex rounded-full border  content-center bg-white hover:bg-white transition duration-500  items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
//         containerClassName
//       )}
//       {...props}>
//       <div
//         className={cn("w-auto text-white z-10 bg-white px-4 py-2 rounded-[inherit]", className)}>
//         {children}
//       </div>
//       <motion.div
//         className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]")}
//         style={{
//           filter: "blur(2px)",
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//         }}
//         initial={{ background: movingMap[direction] }}
//         animate={{
//           background: hovered
//             ? [movingMap[direction], highlight]
//             : movingMap[direction],
//         }}
//         transition={{ ease: "linear", duration: duration ?? 1 }} />
//       <div className="bg-white absolute z-1 flex-none inset-[2px] rounded-[100px]" />
//     </Tag>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";

// Utility function for combining class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = currentDirection => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  // Enhanced gradient mappings with better colors
  const movingMap = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(147, 51, 234, 0.8) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(236, 72, 153, 0.8) 0%, rgba(251, 113, 133, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, rgba(251, 113, 133, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.6) 30%, rgba(236, 72, 153, 0.4) 60%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-gray-200/50 content-center bg-white hover:bg-white transition-all duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[3px] decoration-clone w-fit",
        // Enhanced 3D effects
        "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]",
        "hover:shadow-[0_16px_64px_rgba(59,130,246,0.15),0_8px_32px_rgba(147,51,234,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]",
        "transform hover:scale-105 hover:-translate-y-1",
        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-50/50 before:via-sky-50/50 before:to-sky-50/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        containerClassName
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
      }}
      {...props}
    >
      {/* Content container with enhanced styling */}
      <div
        className={cn(
          "relative z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-[inherit] text-gray-800 font-medium",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]",
          "transition-all duration-300",
          "hover:bg-white/95 hover:text-gray-900",
          className
        )}
      >
        {children}
      </div>

      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] z-0 transition-all duration-500"
        style={{
          background: hovered ? highlight : movingMap[direction],
          filter: "blur(1px)",
          opacity: hovered ? 0.9 : 0.6,
        }}
      />

      {/* Inner shadow/highlight ring */}
      <div 
        className="absolute inset-[2px] rounded-full z-1 transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
          boxShadow: hovered 
            ? 'inset 0 2px 4px rgba(0,0,0,0.05), inset 0 -2px 4px rgba(255,255,255,0.8)'
            : 'inset 0 1px 2px rgba(0,0,0,0.03), inset 0 -1px 2px rgba(255,255,255,0.6)'
        }}
      />

      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-full z-[-1] transition-all duration-500"
        style={{
          background: movingMap[direction],
          filter: "blur(8px)",
          opacity: hovered ? 0.3 : 0.1,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      />
    </Tag>
  );
}

// Demo component
export function HoverBorderGradientDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex justify-center items-center p-8">
      <div className="space-y-8 text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="flex items-center space-x-3 text-lg"
        >
          <span>Simplicity is Key</span>
        </HoverBorderGradient>
        
       
      </div>
    </div>
  );
}