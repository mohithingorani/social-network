"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function LandingNav() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When the sentinel is no longer visible at the top, we consider the page "scrolled".
        setScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const navClass = useMemo(
    () =>
      cx(
        "sticky top-0 z-50",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-[#0a0a0a]/85 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "bg-[#0a0a0a]/55 backdrop-blur-md",
      ),
    [scrolled],
  );

  const signInClass = cx(
    "inline-flex items-center justify-center",
    "h-10 px-3 rounded-xl",
    "text-sm font-medium text-white/70",
    "bg-white/[0.03] border border-white/10",
    "hover:text-white hover:bg-white/[0.06] hover:border-white/15",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66A4AF]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    "transition-colors",
  );

  const ctaClass = cx(
    "inline-flex items-center justify-center",
    "h-10 px-4 rounded-xl",
    "text-sm font-semibold",
    "text-[#0a0a0a]",
    "bg-gradient-to-b from-[#F0C796] to-[#D3965B]",
    "hover:from-[#F6D2A6] hover:to-[#DDA06A]",
    "border border-black/10",
    "shadow-[0_12px_34px_rgba(211,150,91,0.18)] hover:shadow-[0_16px_44px_rgba(211,150,91,0.22)]",
    "active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3965B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    "transition-[box-shadow,transform,background-image]",
  );

  return (
    <>
      {/* 1px sentinel used for scroll state */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative w-7 h-7">
              <Image src="/newlogo.svg" fill alt="UNIVO" className="object-contain" />
            </span>
            <span className="text-white font-semibold text-sm tracking-wide">UNIVO</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/signin" className={signInClass}>
              Sign In
            </Link>
            <Link href="/signin" className={ctaClass}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
