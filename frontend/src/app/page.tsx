"use client";

import { Hero, Features, Preview, FinalCTA, LandingFooter } from "./components/landing";
import { LandingNav } from "./components/landing/LandingNav";

/**
 * Minimal, static page backdrop — no glow. Just the base color and a faint
 * grid that fades out at the edges, so content sits on a subtle techy surface
 * rather than flat black.
 */
function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <PageBackdrop />

      <div className="relative z-10">
        <LandingNav />

        <main>
          <Hero />
          <Features />
          <Preview />
          <FinalCTA />
        </main>

        <LandingFooter />
      </div>
    </div>
  );
}
