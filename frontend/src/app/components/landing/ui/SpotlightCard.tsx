"use client";

import { ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility — no longer renders a glow. */
  spotlight?: "amber" | "teal" | "white";
  /** Kept for API compatibility. */
  ring?: boolean;
}

/**
 * Minimal techy panel: a hairline border on a near-flat surface. No glow, no
 * spotlight — just a quiet border-brightening on hover. Shared building block
 * for the bento grid and showcase cards.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  return (
    <div
      className={[
        "relative rounded-xl border border-white/[0.07] bg-white/[0.015]",
        "transition-colors duration-200 hover:border-white/[0.14]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
