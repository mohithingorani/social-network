"use client";

import { Hero, Features, Preview, Communities, Testimonials, FinalCTA, LandingFooter } from "./components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center">
              <span className="text-xs font-bold">U</span>
            </div>
            <span className="text-white font-medium text-sm">UNIVO CHAT</span>
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

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <Preview />
        <Communities />
        <Testimonials />
        <FinalCTA />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}