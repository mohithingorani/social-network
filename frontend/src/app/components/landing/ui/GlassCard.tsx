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
        bg-white/[0.03]
        border border-white/10
        backdrop-blur-xl
        rounded-2xl
        p-5
        shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]
        ${hover ? "hover:border-white/16 hover:bg-white/[0.045] hover:-translate-y-0.5 transition-all duration-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
