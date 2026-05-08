"use client";

import { GlassCard } from "./ui/GlassCard";
import { Globe, Brain, Box, Server, Shield, Trophy, Rocket, Lightbulb } from "lucide-react";

const communities = [
  { icon: Globe, name: "Web Development", description: "Frontend, backend, full-stack" },
  { icon: Brain, name: "AI/ML", description: "Machine learning & AI research" },
  { icon: Box, name: "Open Source", description: "Contribute & discover projects" },
  { icon: Server, name: "DevOps", description: "CI/CD & cloud infrastructure" },
  { icon: Shield, name: "Cybersecurity", description: "Security research & hacking" },
  { icon: Trophy, name: "Competitive Programming", description: "Algorithms & challenges" },
  { icon: Rocket, name: "Startup Builders", description: "Founders & entrepreneurs" },
  { icon: Lightbulb, name: "Indie Hackers", description: "Building solo projects" },
];

function SectionBg() {
  return (
    <>
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />
    </>
  );
}

export function Communities() {
  return (
    <section className="py-20 px-4 relative">
      <SectionBg />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Communities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Find Your Tribe
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Join specialized communities of developers who share your interests, stack, and goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {communities.map((community) => (
            <GlassCard key={community.name} className="h-full cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                  <community.icon className="w-4 h-4 text-white/50" />
                </div>
                <h3 className="text-white font-medium text-sm truncate">{community.name}</h3>
              </div>
              <p className="text-white/30 text-xs mt-2">{community.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}