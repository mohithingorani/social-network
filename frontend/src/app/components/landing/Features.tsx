"use client";

import { GlassCard } from "./ui/GlassCard";
import { motion } from "framer-motion";
import { MessageSquare, Users, Image, Globe, Heart, MessageCircle, TrendingUp } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Real-time Chat", description: "Instant messaging with friends using secure, real-time connections. Chat seamlessly with anyone, anytime." },
  { icon: Image, title: "Photo Posts", description: "Share photos from your day with caption support. Like and comment to engage with friends' content." },
  { icon: Users, title: "Friend Discovery", description: "Find and connect with new people through intelligent friend suggestions and a social graph visualization." },
  { icon: Globe, title: "Social Feed", description: "Stay updated with a personalized feed showing posts from you and your friends in chronological order." },
  { icon: Heart, title: "Likes & Comments", description: "Express yourself with likes and threaded comments on posts. Real-time updates when friends interact." },
  { icon: TrendingUp, title: "Social Graph", description: "Visualize your social network with an interactive graph showing all your connections at a glance." },
];

function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />
    </>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function Features() {
  return (
    <section id="features" className="py-20 px-4 relative">
      <SectionBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Features
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Everything You Need to Stay Connected
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 max-w-2xl mx-auto">
            A complete social platform built for real conversations, real connections, and real moments.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <GlassCard className="h-full p-7 relative overflow-hidden">
              <div className="hidden lg:absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(closest-side,rgba(211,150,91,0.12),transparent)] blur-3xl" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white/65" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-2">Real-time Chat</h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                      Instant messaging that feels snappy. Typing indicators, read states, and smooth delivery so conversations stay fluid.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Latency", value: "~" },
                    { label: "Delivery", value: "Realtime" },
                    { label: "Presence", value: "Online" },
                    { label: "Rooms", value: "1:1 +" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3"
                    >
                      <div className="text-[11px] uppercase tracking-wider text-white/30">
                        {s.label}
                      </div>
                      <div className="text-sm font-medium text-white/75 mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <GlassCard className="h-full p-7 relative overflow-hidden">
              <div className="hidden lg:absolute -bottom-28 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(closest-side,rgba(102,164,175,0.12),transparent)] blur-3xl" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white/65" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-2">Social Graph</h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      See your connections evolve. A quick way to understand who you know, and who you should meet next.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {features
            .filter((f) => f.title !== "Real-time Chat" && f.title !== "Social Graph")
            .slice(0, 4)
            .map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="sm:col-span-1 lg:col-span-3"
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white/55" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm mb-2">{feature.title}</h3>
                      <p className="text-white/35 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
