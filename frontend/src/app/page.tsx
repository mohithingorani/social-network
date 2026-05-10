"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Hero, Features, Preview, Communities, FinalCTA, LandingFooter } from "./components/landing";

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/8 to-purple-500/8 blur-3xl"
      />

      <motion.div
        animate={{ y: [30, -30, 30], x: [15, -15, 15] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/8 to-pink-500/8 blur-3xl"
      />

      <motion.div
        animate={{ y: [-15, 15, -15], x: [-20, 20, -20] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/6 to-blue-500/6 blur-3xl"
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <BackgroundEffects />

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Image src="/newlogo.svg" width={28} height={28} alt="logo" />
              <span className="text-white font-medium text-sm">UNIVO</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="/signin" className="px-3 py-1.5 text-white/50 hover:text-white text-sm transition-colors">
                Sign In
              </a>
              <a
                href="/signin"
                className="px-3 py-1.5 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>

        <main>
          <Hero />
          <Features />
          <Preview />
          <Communities />
          <FinalCTA />
        </main>

        <LandingFooter />
      </div>
    </div>
  );
}