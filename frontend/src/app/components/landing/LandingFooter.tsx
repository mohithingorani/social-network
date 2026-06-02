"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, ArrowUpRight } from "lucide-react";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Feed", href: "#features" },
      { label: "Messages", href: "#features" },
      { label: "Discover", href: "#features" },
      { label: "Social graph", href: "#tour" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export function LandingFooter() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#0a0a0a]">
      {/* faint techy grid, no glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* main */}
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="relative h-7 w-7">
                <Image src="/newlogo.svg" fill alt="UNIVO" className="object-contain" />
              </span>
              <span className="text-sm font-medium tracking-[0.14em] text-white">UNIVO</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/40">
              The social network built for campus — share moments, message friends,
              and discover the people around you.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition-colors hover:border-white/20 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm font-light text-white/50 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 sm:flex-row">
          <p className="font-mono text-xs text-white/30">
            © {new Date().getFullYear()} UNIVO
          </p>
          <div className="flex items-center gap-2 text-xs font-light text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B9DF0]" />
            Built for students, by students
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-light text-white/40 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
