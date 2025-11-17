// // /**
// //  * Note: Use position fixed according to your needs
// //  * Desktop navbar is better positioned at the bottom
// //  * Mobile navbar is better positioned at bottom right.
// //  **/
// // "use client";
// // import { cn } from "../../lib/utils";
// // import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
// // import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

// // import { useRef, useState } from "react";

// // export const FloatingDock = ({
// //   items,
// //   desktopClassName,
// //   mobileClassName
// // }) => {
// //   return (
// //     <>
// //       <FloatingDockDesktop items={items} className={desktopClassName} />
// //       <FloatingDockMobile items={items} className={mobileClassName} />
// //     </>
// //   );
// // };

// // const FloatingDockMobile = ({
// //   items,
// //   className
// // }) => {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <div className={cn("relative block md:hidden", className)}>
// //       <AnimatePresence>
// //         {open && (
// //           <motion.div
// //             layoutId="nav"
// //             className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2">
// //             {items.map((item, idx) => (
// //               <motion.div
// //                 key={item.title}
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{
// //                   opacity: 1,
// //                   y: 0,
// //                 }}
// //                 exit={{
// //                   opacity: 0,
// //                   y: 10,
// //                   transition: {
// //                     delay: idx * 0.05,
// //                   },
// //                 }}
// //                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}>
// //                 <a
// //                   href={item.href}
// //                   key={item.title}
// //                   className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900">
// //                   <div className="h-4 w-4">{item.icon}</div>
// //                 </a>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800">
// //         <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
// //       </button>
// //     </div>
// //   );
// // };

// // const FloatingDockDesktop = ({
// //   items,
// //   className
// // }) => {
// //   let mouseX = useMotionValue(Infinity);
// //   return (
// //     <motion.div
// //       onMouseMove={(e) => mouseX.set(e.pageX)}
// //       onMouseLeave={() => mouseX.set(Infinity)}
// //       className={cn(
// //         "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
// //         className
// //       )}>
// //       {items.map((item) => (
// //         <IconContainer mouseX={mouseX} key={item.title} {...item} />
// //       ))}
// //     </motion.div>
// //   );
// // };

// // function IconContainer({
// //   mouseX,
// //   title,
// //   icon,
// //   href
// // }) {
// //   let ref = useRef(null);

// //   let distance = useTransform(mouseX, (val) => {
// //     let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

// //     return val - bounds.x - bounds.width / 2;
// //   });

// //   let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
// //   let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

// //   let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
// //   let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

// //   let width = useSpring(widthTransform, {
// //     mass: 0.1,
// //     stiffness: 150,
// //     damping: 12,
// //   });
// //   let height = useSpring(heightTransform, {
// //     mass: 0.1,
// //     stiffness: 150,
// //     damping: 12,
// //   });

// //   let widthIcon = useSpring(widthTransformIcon, {
// //     mass: 0.1,
// //     stiffness: 150,
// //     damping: 12,
// //   });
// //   let heightIcon = useSpring(heightTransformIcon, {
// //     mass: 0.1,
// //     stiffness: 150,
// //     damping: 12,
// //   });

// //   const [hovered, setHovered] = useState(false);

// //   return (
// //     <a href={href}>
// //       <motion.div
// //         ref={ref}
// //         style={{ width, height }}
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //         className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
// //         <AnimatePresence>
// //           {hovered && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 10, x: "-50%" }}
// //               animate={{ opacity: 1, y: 0, x: "-50%" }}
// //               exit={{ opacity: 0, y: 2, x: "-50%" }}
// //               className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
// //               {title}
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <motion.div
// //           style={{ width: widthIcon, height: heightIcon }}
// //           className="flex items-center justify-center">
// //           {icon}
// //         </motion.div>
// //       </motion.div>
// //     </a>
// //   );
// // }
// // File: frontend/src/components/ui/floating-dock.jsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { cn } from "../../lib/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";

// export const FloatingDock = ({
//   items,
//   desktopClassName,
//   mobileClassName,
// }) => {
//   return (
//     <>
//       <FloatingDockDesktop items={items} className={desktopClassName} />
//       <FloatingDockMobile items={items} className={mobileClassName} />
//     </>
//   );
// };

// const FloatingDockMobile = ({
//   items,
//   className
// }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className={cn("relative block md:hidden", className)}>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             layoutId="nav"
//             className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
//           >
//             {items.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: 10,
//                   transition: {
//                     delay: idx * 0.05,
//                   },
//                 }}
//                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}
//               >
//                 <a
//                   href={item.href}
//                   className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100"
//                 >
//                   <div className="h-4 w-4">{item.icon}</div>
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
//       >
//         <IconLayoutNavbarCollapse className="h-5 w-5 text-gray-600" />
//       </button>
//     </div>
//   );
// };

// const FloatingDockDesktop = ({
//   items,
//   className
// }) => {
//   let mouseX = useMotionValue(Infinity);
//   return (
//     <motion.div
//       onMouseMove={(e) => mouseX.set(e.pageX)}
//       onMouseLeave={() => mouseX.set(Infinity)}
//       className={cn(
//         "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white shadow-md px-4 pb-3 md:flex border border-gray-100",
//         className
//       )}
//     >
//       {items.map((item) => (
//         <IconContainer mouseX={mouseX} key={item.title} {...item} />
//       ))}
//     </motion.div>
//   );
// };

// function IconContainer({ mouseX, title, icon, href }) {
//   let ref = useRef(null);

//   let distance = useTransform(mouseX, (val) => {
//     let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
//     return val - bounds.x - bounds.width / 2;
//   });

//   let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
//   let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
//   let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
//   let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

//   let width = useSpring(widthTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });
//   let height = useSpring(heightTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });
//   let widthIcon = useSpring(widthTransformIcon, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });
//   let heightIcon = useSpring(heightTransformIcon, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   const [hovered, setHovered] = useState(false);

//   return (
//     <a href={href}>
//       <motion.div
//         ref={ref}
//         style={{ width, height }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className="relative flex aspect-square items-center justify-center rounded-full bg-gray-100 border border-gray-200"
//       >
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               initial={{ opacity: 0, y: 10, x: "-50%" }}
//               animate={{ opacity: 1, y: 0, x: "-50%" }}
//               exit={{ opacity: 0, y: 2, x: "-50%" }}
//               className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs whitespace-pre text-gray-800"
//             >
//               {title}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.div
//           style={{ width: widthIcon, height: heightIcon }}
//           className="flex items-center justify-center"
//         >
//           {icon}
//         </motion.div>
//       </motion.div>
//     </a>
//   );
// }
import React, { useState, useRef } from "react";

// Mock Tabler Icons - Replace with actual imports in your project
const IconHome = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconActivity = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconQuote = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// const IconUserPlus = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//   </svg>
// );

// const IconLogin = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//   </svg>
// );

const IconMenu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Utility function for combining class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      {open && (
        <div className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="animate-in fade-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${(items.length - 1 - idx) * 50}ms` }}
            >
              <a
                href={item.href}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:scale-110 transition-all duration-300"
              >
                <div className="h-5 w-5 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                
                {/* Mobile tooltips removed - only desktop tooltips */}
              </a>
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:scale-110 transition-all duration-300"
      >
        <IconMenu className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className
}) => {
  const [mouseX, setMouseX] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl px-6 pb-3 md:flex border border-gray-200/50 relative",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-blue-50/20 before:via-sky-50/20 before:to-pink-50/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
    >
      {items.map((item, index) => (
        <IconContainer
          key={item.title}
          mouseX={mouseX}
          containerRef={containerRef}
          index={index}
          totalItems={items.length}
          {...item}
        />
      ))}
    </div>
  );
};

function IconContainer({ mouseX, containerRef, index, totalItems, title, icon, href }) {
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef(null);

  // Calculate scale based on mouse proximity
  const getScale = () => {
    if (!mouseX || !iconRef.current) return 1;
    
    const iconRect = iconRef.current.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return 1;
    
    const iconCenter = iconRect.left + iconRect.width / 2 - containerRect.left;
    const distance = Math.abs(mouseX - iconCenter);
    
    if (distance < 60) {
      return 1.8 - (distance / 60) * 0.8;
    }
    return 1;
  };

  const scale = getScale();

  return (
    <a 
      href={href}
      className="relative flex items-end"
    >
      <div
        ref={iconRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        style={{
          width: `${40 * scale}px`,
          height: `${40 * scale}px`,
          transform: `translateY(${scale > 1.2 ? -8 : 0}px)`,
        }}
      >
        {/* Enhanced Tooltip - Below icons with white bg and blue text */}
        <div 
          className={`absolute top-full mt-2 px-3 py-2 bg-white text-blue-500 text-sm rounded-lg shadow-lg border border-blue-800/10 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {title}
          {/* Tooltip arrow */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-blue-600"></div>
        </div>

        {/* Icon with scaling */}
        <div
          className="flex items-center justify-center transition-all duration-200"
          style={{
            width: `${20 * Math.min(scale, 1.5)}px`,
            height: `${20 * Math.min(scale, 1.5)}px`,
          }}
        >
          {icon}
        </div>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-sky-400/20 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </a>
  );
}

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-blue-600" />,
      href: "#hero",
    },
    {
      title: "How It Works",
      icon: <IconActivity className="h-full w-full text-blue-600" />,
      href: "#how-it-works",
    },
    {
      title: "Impact",
      icon: <IconChart className="h-full w-full text-blue-600" />,
      href: "#impact",
    },
    {
      title: "Testimonials",
      icon: <IconQuote className="h-full w-full text-blue-600" />,
      href: "#testimonials",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Enhanced Floating Dock</h1>
          <p className="text-gray-600">Hover over the icons to see the enhanced tooltips in action</p>
        </div>
        
        <FloatingDock
          mobileClassName="fixed bottom-4 right-4 z-50"
          desktopClassName="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          items={links}
        />
      </div>
    </div>
  );
}