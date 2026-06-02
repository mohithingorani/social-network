"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product tour", href: "#tour" },
];

export function LandingNav() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: null, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const navClass = useMemo(
    () =>
      cx(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-white/[0.07] bg-[#0a0a0a]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-[#0a0a0a]/30 backdrop-blur-md",
      ),
    [scrolled],
  );

  return (
    <>
      {/* 1px sentinel for scroll state */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <nav className={navClass}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative h-7 w-7">
              <Image src="/newlogo.svg" fill alt="UNIVO" className="object-contain" />
            </span>
            <span className="text-sm font-medium tracking-[0.14em] text-white">UNIVO</span>
          </Link>

          {/* center links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-light text-white/55 transition-colors hover:text-white"
              >
                {l.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#5B9DF0]/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/signin"
              className="inline-flex h-9 items-center justify-center rounded-lg px-3.5 text-sm font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Sign in
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
