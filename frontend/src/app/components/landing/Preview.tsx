"use client";

import { PlaceholderImage } from "./ui/PlaceholderImage";
import { GlassCard } from "./ui/GlassCard";
import { Monitor, MessageCircle, FolderOpen } from "lucide-react";

const previews = [
  { label: "PLACEHOLDER_IMAGE_DASHBOARD", icon: Monitor, title: "Your Dashboard", description: "Track your projects" },
  { label: "PLACEHOLDER_IMAGE_COMMUNITY", icon: MessageCircle, title: "Discussions", description: "Engage with devs" },
  { label: "PLACEHOLDER_IMAGE_PROJECTS", icon: FolderOpen, title: "Project Showcase", description: "Share your work" }
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

export function Preview() {
  return (
    <section className="py-20 px-4 relative">
      <SectionBg />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Experience the Platform
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A sneak peek into what awaits you — modern, intuitive, and built for how developers actually work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {previews.map((preview) => (
            <div key={preview.label}>
              <GlassCard hover={false} className="p-0 overflow-hidden">
                <PlaceholderImage label={preview.label} aspectRatio="video" className="rounded-lg" />
              </GlassCard>
              <div className="mt-3 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/5 mb-2">
                  <preview.icon className="w-4 h-4 text-white/40" />
                </div>
                <h3 className="text-white text-sm font-medium">{preview.title}</h3>
                <p className="text-white/30 text-xs">{preview.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}