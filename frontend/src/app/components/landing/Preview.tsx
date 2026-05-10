"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { LayoutGrid, MessageCircle, Network } from "lucide-react";

const previews = [
  {
    icon: LayoutGrid,
    title: "Your Feed",
    description: "Posts from friends in real-time",
    content: (
      <div className="space-y-3">
        <div className="bg-[#0f0f10] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Sarah Chen</div>
              <div className="text-white/30 text-xs">2 hours ago</div>
            </div>
          </div>
          <div className="w-full h-32 bg-gradient-to-br from-white/5 to-white/2 rounded-lg mb-3" />
          <div className="text-white/40 text-xs">Had an amazing sunset at the campus quad 🌅</div>
          <div className="flex items-center gap-4 mt-3 text-white/30 text-xs">
            <span className="flex items-center gap-1">♥ 42</span>
            <span className="flex items-center gap-1">💬 8</span>
          </div>
        </div>
        <div className="bg-[#0f0f10] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/5 flex items-center justify-center">
              <span className="text-white text-xs font-bold">MJ</span>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Marcus J.</div>
              <div className="text-white/30 text-xs">5 hours ago</div>
            </div>
          </div>
          <div className="text-white/40 text-xs leading-relaxed">Just wrapped up finals week! Time to relax and enjoy the break before next semester starts.</div>
          <div className="flex items-center gap-4 mt-3 text-white/30 text-xs">
            <span className="flex items-center gap-1">♥ 28</span>
            <span className="flex items-center gap-1">💬 5</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Message friends instantly",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 p-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SC</span>
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Sarah Chen</div>
            <div className="text-white/30 text-xs">Online</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 p-3 space-y-3 overflow-hidden">
          <div className="flex justify-start">
            <div className="bg-[#0f0f10] border border-white/5 rounded-2xl rounded-bl-md px-3 py-2 max-w-[80%]">
              <div className="text-white/50 text-xs">Hey! Are you coming to the study group tonight?</div>
              <div className="text-white/20 text-[10px] mt-1">2:30 PM</div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500/20 border border-blue-500/20 rounded-2xl rounded-br-md px-3 py-2 max-w-[80%]">
              <div className="text-white/70 text-xs">Yeah! I&apos;ll be there by 6. Can&apos;t wait!</div>
              <div className="text-white/20 text-[10px] mt-1 text-right">2:32 PM</div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[#0f0f10] border border-white/5 rounded-2xl rounded-bl-md px-3 py-2 max-w-[80%]">
              <div className="text-white/50 text-xs">Great! Should I bring some snacks?</div>
              <div className="text-white/20 text-[10px] mt-1">2:33 PM</div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-white/5">
          <div className="bg-[#0f0f10] border border-white/5 rounded-full px-4 py-2 text-white/30 text-xs">Type a message...</div>
        </div>
      </div>
    ),
  },
  {
    icon: Network,
    title: "Social Graph",
    description: "Explore your connections",
    content: (
      <div className="h-full flex items-center justify-center relative">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-[#18181A] flex items-center justify-center z-10 relative">
              <span className="text-white text-xs font-bold">You</span>
            </div>
          </div>
          {[
            { angle: 0, label: "Alex", color: "from-blue-500/40" },
            { angle: 72, label: "Priya", color: "from-green-500/40" },
            { angle: 144, label: "Jordan", color: "from-purple-500/40" },
            { angle: 216, label: "Sam", color: "from-orange-500/40" },
            { angle: 288, label: "Riley", color: "from-pink-500/40" },
          ].map((node) => {
            const rad = (node.angle - 90) * (Math.PI / 180);
            const x = 72 * Math.cos(rad);
            const y = 72 * Math.sin(rad);
            return (
              <div
                key={node.label}
                className="absolute flex flex-col items-center"
                style={{ left: `calc(50% + ${x}px - 20px)`, top: `calc(50% + ${y}px - 12px)` }}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${node.color} to-transparent border border-white/10 flex items-center justify-center`}>
                  <span className="text-white text-[10px] font-bold">{node.label.slice(0, 2)}</span>
                </div>
                <span className="text-white/30 text-[9px] mt-1">{node.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
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
        <div className="text-center mb-16">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            See the Experience
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A sneak peek into what awaits you — modern, intuitive, and built for how students actually connect.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {previews.map((preview, i) => (
            <div key={preview.title}>
              <GlassCard hover={false} className="p-0 overflow-hidden h-[380px]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                  <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                    <preview.icon className="w-3 h-3 text-white/30" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">{preview.title}</div>
                    <div className="text-white/20 text-[10px]">{preview.description}</div>
                  </div>
                </div>
                <div className="p-3 h-[calc(100%-41px)] overflow-hidden">
                  {preview.content}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}