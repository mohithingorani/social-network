"use client";

import { GlassCard } from "./ui/GlassCard";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Senior Engineer", company: "Google", quote: "Found my current role through a community here. This platform transformed how I connect with developers." },
  { name: "Marcus Johnson", role: "Full Stack Dev", company: "Vercel", quote: "The best community I've been part of. Collaboration features helped me ship my project 3x faster." },
  { name: "Elena Rodriguez", role: "OSS Maintainer", company: "Linux Foundation", quote: "Found amazing contributors for my open source project. The community genuinely cares about building together." },
  { name: "David Kim", role: "CTO", company: "Startup", quote: "My go-to place for hiring. The quality of developers here is unmatched. Built my entire team here." }
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

export function Testimonials() {
  return (
    <section className="py-20 px-4 relative">
      <SectionBg />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Loved by Developers
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            See what developers from top companies are saying about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.name} className="h-full">
              <div className="mb-3">
                <Quote className="w-5 h-5 text-white/15" />
              </div>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-xs">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-white text-sm">{testimonial.name}</div>
                  <div className="text-white/30 text-xs">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}