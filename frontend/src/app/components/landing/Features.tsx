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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-2">{feature.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed">
                      {feature.description}
                    </p>
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