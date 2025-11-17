"use client";
import { cn } from ".././../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

// --- Utility Components ---

export const NavbarLogo = ({ className, children }) => {
  return (
    <div
      className={cn(
        "text-xl font-bold text-gray-800 dark:text-white",
        className
      )}
    >
            {children || "CharityPlate"}   {" "}
    </div>
  );
};

export const NavbarButton = ({
  variant = "primary",
  className,
  children,
  onClick,
}) => {
  const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg";
  const primaryClasses =
    "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600";
  const secondaryClasses =
    "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700";

  const variantClasses =
    variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses, className)}
    >
            {children}   {" "}
    </button>
  );
};

// --- Desktop Components ---

export const Navbar = ({ children }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm dark:bg-neutral-900/80"
    >
           {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div> 
       {" "}
    </motion.header>
  );
};

export const NavBody = ({ children }) => {
  return (
    <div className="flex h-16 items-center justify-between md:flex">
            {children}   {" "}
    </div>
  );
};

export const NavItems = ({ items }) => {
  return (
    <nav className="hidden md:flex md:space-x-8">
           {" "}
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className="relative text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-500"
        >
                    <span className="block">{item.name}</span>         {" "}
          {/* Optional: Add an active state indicator */}         {" "}
          {/* <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-indigo-600 opacity-0 transition-opacity"></span> */}
                 {" "}
        </a>
      ))}
         {" "}
    </nav>
  );
};

// --- Mobile Components ---

export const MobileNav = ({ children }) => {
  return <div className="md:hidden">{children}</div>;
};

export const MobileNavHeader = ({ children }) => {
  return (
    <div className="flex h-16 items-center justify-between">{children}</div>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
      aria-expanded={isOpen ? "true" : "false"}
    >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} 
       {" "}
    </button>
  );
};

export const MobileNavMenu = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
           {" "}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
                   {" "}
          <div className="flex flex-col space-y-4 px-2 pb-3 pt-2">
                        {children}         {" "}
          </div>
                 {" "}
        </motion.div>
      )}
         {" "}
    </AnimatePresence>
  );
};
