"use client";
import React from "react";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export function HoverBorderGradientDemo() {
  return (
    <div className="m-8 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-white bg-white text-black dark:text-black flex items-center">
        
        <span>Simplicity is Key</span>
      </HoverBorderGradient>
    </div>
  );
}

