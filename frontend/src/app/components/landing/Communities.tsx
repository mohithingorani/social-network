"use client";

import { GlassCard } from "./ui/GlassCard";
import { LayoutGrid, MessageCircle, Users, UserPlus } from "lucide-react";

const sections = [
  { icon: LayoutGrid, name: "Feed", description: "Posts & photos from your network" },
  { icon: MessageCircle, name: "Messages", description: "Real-time chat with friends" },
  { icon: Users, name: "Friends", description: "Manage your connections" },
  { icon: UserPlus, name: "Discover", description: "Find new people to connect with" },
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
        <div className="text-center mb-16">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Platform Sections
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Everything in One Place
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            All the features you need to stay connected, discover new people, and share your world — seamlessly integrated.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section) => (
            <GlassCard key={section.name} className="h-full cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <section.icon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{section.name}</h3>
                <p className="text-white/30 text-xs">{section.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}