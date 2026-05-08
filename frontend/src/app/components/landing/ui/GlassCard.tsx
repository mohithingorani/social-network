"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = "", hover = true, delay = 0 }: GlassCardProps) {
  return (
    <div
      className={`
        bg-[#151515]
        border border-white/5
        rounded-lg
        p-5
        ${hover ? "hover:border-white/10 hover:bg-[#181818] transition-all duration-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}