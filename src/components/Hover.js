"use client";
import React from "react";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export function HoverBorder() {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-white bg-white text-black dark:text-black flex items-center">
        
        <span>Making a Difference Together</span>
      </HoverBorderGradient>
    </div>
  );
}

