"use client";

import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "./ui/PlaceholderImage";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-white/40 text-xs tracking-wide">For developers, by developers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Where Developers Connect & Build Together
            </h1>

            <p className="text-lg md:text-xl text-white/50 mb-8 max-w-xl mx-auto lg:mx-0">
              Join a community of developers, open-source contributors, and tech enthusiasts. Share projects, discuss ideas, and collaborate.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a 
                href="/signin" 
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-sm rounded bg-white text-black hover:bg-white/90 transition-colors"
              >
                Join the Community
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-sm rounded border border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                Explore Features
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="w-full">
            <PlaceholderImage 
              label="PLACEHOLDER_HERO_DASHBOARD" 
              aspectRatio="video"
              className="border-white/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}