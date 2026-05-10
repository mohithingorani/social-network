"use client";

import { GlassCard } from "./ui/GlassCard";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Jordan Kim", role: "Computer Science", company: "UC Berkeley", quote: "Finally a social platform built for students. The friend discovery feature helped me find study buddies from my classes!" },
  { name: "Priya Sharma", role: "Engineering", company: "MIT", quote: "The real-time chat is incredibly smooth. I coordinate study groups and group projects without switching apps." },
  { name: "Alex Rivera", role: "Data Science", company: "Stanford", quote: "The social graph visualization is awesome. It really shows me how my network is growing semester by semester." },
  { name: "Sam Chen", role: "Design", company: "Parsons", quote: "Clean, fast, and actually feels designed for college life. My friends and I switched from the big platforms and never looked back." },
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
        <div className="text-center mb-16">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Loved by Students
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A campus-first network that feels fast, intentional, and actually designed.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <GlassCard className="h-full p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(closest-side,rgba(211,150,91,0.16),transparent)] blur-3xl" />
              <div className="relative">
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-white/60 text-lg leading-relaxed mb-7">
                  {testimonials[0].quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{testimonials[0].name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{testimonials[0].name}</div>
                    <div className="text-white/35 text-sm">
                      {testimonials[0].role} · {testimonials[0].company}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {testimonials.slice(1).map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={i === 0 ? "lg:rotate-[-0.6deg]" : i === 1 ? "lg:rotate-[0.6deg]" : ""}
              >
                <GlassCard className="h-full">
                  <div className="mb-3">
                    <Quote className="w-5 h-5 text-white/15" />
                  </div>
                  <p className="text-white/50 text-sm mb-5 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{testimonial.name}</div>
                      <div className="text-white/35 text-xs">{testimonial.role} · {testimonial.company}</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
