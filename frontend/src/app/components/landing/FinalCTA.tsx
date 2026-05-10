"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function FinalCTA() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to join?
        </motion.h2>

        <motion.p variants={fadeUp} className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
          Create your account and start connecting with students across campus and beyond. It&apos;s free and takes under a minute.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/signin"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/signin"
            className="inline-flex items-center justify-center px-6 py-3 font-medium text-sm rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            Sign In
          </a>
        </motion.div>

        <motion.p variants={fadeUp} className="text-white/20 text-xs mt-6">
          Free forever &middot; No credit card required
        </motion.p>
      </motion.div>
    </section>
  );
}