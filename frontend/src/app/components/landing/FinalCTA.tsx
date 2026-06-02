"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function FinalCTA() {
  return (
    <section className="relative px-4 py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] px-6 py-16 text-center sm:px-12"
      >
        {/* faint techy grid, no glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)",
          }}
        />

        <div className="relative">
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 flex -space-x-2.5"
          >
            {[
              "from-[#7c6cf0] to-[#4b3fb0]",
              "from-[#5B9DF0] to-[#3F6FB0]",
              "from-[#4a86d9] to-[#2b5a8a]",
              "from-[#e07a9a] to-[#a8466a]",
            ].map((c, i) => (
              <div key={i} className={`h-9 w-9 rounded-full bg-gradient-to-br ${c} ring-2 ring-[#0a0a0a]`} />
            ))}
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl font-light tracking-tight text-white sm:text-5xl">
            Your campus is already here.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg font-light text-white/55">
            Join in under a minute and start connecting with the people right around you.
            Free forever, no credit card.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signin"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-white/90"
            >
              Create your account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/signin"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/12 px-6 text-sm font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              Sign in
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
