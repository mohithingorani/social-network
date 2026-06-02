"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, UserPlus } from "lucide-react";
import { ProductMockup } from "./ProductMockup";
import { TiltCard } from "./ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* mono eyebrow */}
          <motion.div
            variants={item}
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B9DF0] pulse-ring" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              The campus social network
            </span>
          </motion.div>

          {/* thin, dominant headline */}
          <motion.h1
            variants={item}
            className="mx-auto max-w-4xl text-balance text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Your whole campus,
            <br />
            <span className="text-white/45">in one place.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/50 sm:text-xl"
          >
            Share moments, message friends in real time, and discover the people around
            you — all in one place built for campus life.
          </motion.p>

          {/* CTAs — flat, minimal */}
          <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signin"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-white/90"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#features"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/12 px-6 text-sm font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              See how it works
            </a>
          </motion.div>

          {/* techy keyword line */}
          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-white/30"
          >
            <span>Realtime chat</span>
            <span className="text-white/15">/</span>
            <span>Social graph</span>
            <span className="text-white/15">/</span>
            <span>Discovery</span>
            <span className="text-white/15">/</span>
            <span>Live feed</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- showcase ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 max-w-6xl"
      >
        {/* flat status pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute -left-2 top-16 z-20 hidden md:block"
        >
          <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-[#0e0e10] px-3 py-2">
            <Heart className="h-3.5 w-3.5 text-[#5B9DF0]" />
            <div className="text-[11px] leading-tight">
              <div className="font-medium text-white/85">Priya liked your post</div>
              <div className="font-mono text-[9px] text-white/30">just now</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="absolute -right-2 top-44 z-20 hidden md:block"
        >
          <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-[#0e0e10] px-3 py-2">
            <UserPlus className="h-3.5 w-3.5 text-[#5B9DF0]" />
            <div className="text-[11px] leading-tight">
              <div className="font-medium text-white/85">3 new friend requests</div>
              <div className="font-mono text-[9px] text-white/30">from your campus</div>
            </div>
          </div>
        </motion.div>

        <TiltCard maxTilt={4}>
          <ProductMockup />
        </TiltCard>

        <div className="pointer-events-none absolute -bottom-px inset-x-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </motion.div>
    </section>
  );
}
