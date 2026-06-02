"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Network,
  ImageIcon,
  UserPlus,
  Heart,
  Plus,
  Check,
  CheckCheck,
  CalendarDays,
  LayoutGrid,
} from "lucide-react";
import { SpotlightCard } from "./ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function Eyebrow({ icon: Icon, label }: { icon: typeof MessageSquare; label: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
      <Icon className="h-3.5 w-3.5 text-white/30" />
      {label}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B9DF0]">
            Everything you need
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl">
            One app for the whole
            <br className="hidden sm:block" /> campus experience
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg font-light text-white/50">
            From the first hello to the group chat that never sleeps — every tool
            built for how students actually connect.
          </motion.p>
        </motion.div>

        {/* bento */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]"
        >
          {/* A — Real-time chat (wide, interaction preview) */}
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <SpotlightCard spotlight="amber" className="h-full p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <Eyebrow icon={MessageSquare} label="Real-time chat" />
                  <h3 className="text-2xl font-normal tracking-tight text-white">Conversations that feel instant</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/50">
                    Typing indicators, read receipts and live presence over a websocket
                    connection. Group projects, study plans and late-night chats — no lag,
                    no refresh.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Typing indicators", "Read receipts", "Group chats", "Live presence"].map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-xs text-white/55"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* chat preview */}
                <div className="w-full max-w-[260px] shrink-0 rounded-2xl border border-white/[0.08] bg-[#0d0d0f]/80 p-3.5">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf0] to-[#4b3fb0] text-[10px] font-bold text-white">AR</div>
                    <div>
                      <div className="text-xs font-medium text-white">Ananya R.</div>
                      <div className="text-[10px] text-[#5B9DF0]">online</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.05] px-3 py-2 text-[11px] text-white/70">
                      did you finish the deck? 👀
                    </div>
                    <div className="ml-auto flex max-w-[80%] flex-col items-end">
                      <div className="rounded-2xl rounded-br-md bg-[#5B9DF0] px-3 py-2 text-[11px] font-medium text-[#0a0a0a]">
                        almost — sending in 5
                      </div>
                      <span className="mt-1 flex items-center gap-1 text-[9px] text-white/30">
                        <CheckCheck className="h-3 w-3 text-[#5B9DF0]" /> Seen
                      </span>
                    </div>
                    <div className="flex items-center gap-1 pl-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* B — Social graph (tall, viz) */}
          <motion.div variants={fadeUp} className="lg:col-span-4 lg:row-span-2">
            <SpotlightCard spotlight="teal" className="flex h-full flex-col p-7">
              <Eyebrow icon={Network} label="Social graph" />
              <h3 className="text-2xl font-normal tracking-tight text-white">See your circle grow</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/50">
                An interactive map of every connection. Spot mutuals, find your way into a
                new group, and watch your network expand each semester.
              </p>

              {/* constellation */}
              <div className="relative mt-6 flex-1">
                <svg viewBox="0 0 240 240" className="h-full w-full min-h-[220px]">
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#5B9DF0" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#5B9DF0" stopOpacity="0.85" />
                    </radialGradient>
                  </defs>
                  {[
                    [120, 36],
                    [206, 96],
                    [184, 196],
                    [56, 196],
                    [34, 96],
                  ].map(([x, y], i) => (
                    <line
                      key={i}
                      x1="120"
                      y1="120"
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* outer nodes */}
                  {[
                    { x: 120, y: 36, c: "#7c6cf0", t: "Alex" },
                    { x: 206, y: 96, c: "#5fae8f", t: "Priya" },
                    { x: 184, y: 196, c: "#e07a9a", t: "Jordan" },
                    { x: 56, y: 196, c: "#4a86d9", t: "Sam" },
                    { x: 34, y: 96, c: "#5B9DF0", t: "Riley" },
                  ].map((n) => (
                    <g key={n.t}>
                      <circle cx={n.x} cy={n.y} r="15" fill={n.c} fillOpacity="0.85" />
                      <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-white" fontSize="10" fontWeight="700">
                        {n.t[0]}
                      </text>
                    </g>
                  ))}
                  {/* core */}
                  <circle cx="120" cy="120" r="26" fill="url(#coreGlow)" />
                  <circle cx="120" cy="120" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <text x="120" y="124" textAnchor="middle" className="fill-white" fontSize="11" fontWeight="800">
                    You
                  </text>
                </svg>
              </div>

              <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-xs text-white/45">
                <span className="h-2 w-2 rounded-full bg-[#5B9DF0]" />
                Tap any node to explore mutual friends
              </div>
            </SpotlightCard>
          </motion.div>

          {/* C — Photo posts */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SpotlightCard className="h-full p-6">
              <Eyebrow icon={ImageIcon} label="Photo posts" />
              <h3 className="text-lg font-medium text-white">Share the moment</h3>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {[
                  "from-[#5B9DF0]/40 to-[#2b5a8a]/30",
                  "from-[#5B9DF0]/40 to-[#3F6FB0]/30",
                  "from-[#7c6cf0]/40 to-[#4b3fb0]/30",
                  "from-[#e07a9a]/40 to-[#a8466a]/30",
                  "from-[#5fae8f]/40 to-[#357a5f]/30",
                  "from-[#4a86d9]/40 to-[#2b5a8a]/30",
                ].map((g, i) => (
                  <div key={i} className={`relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${g}`}>
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded bg-black/30 px-1 text-[9px] text-white/80 backdrop-blur-sm">
                        <Heart className="h-2.5 w-2.5 fill-white/80" /> 54
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* D — Friend discovery */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SpotlightCard spotlight="teal" className="h-full p-6">
              <Eyebrow icon={UserPlus} label="Discover" />
              <h3 className="text-lg font-medium text-white">Find your people</h3>
              <div className="mt-4 space-y-2.5">
                {[
                  { i: "RV", n: "Rahul Verma", m: "12 mutual", c: "from-[#4a86d9] to-[#2b5a8a]", added: false },
                  { i: "JK", n: "Jordan Kim", m: "8 mutual", c: "from-[#5fae8f] to-[#357a5f]", added: true },
                ].map((p) => (
                  <div key={p.i} className="flex items-center gap-2.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${p.c} text-[11px] font-bold text-white`}>
                      {p.i}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-white">{p.n}</div>
                      <div className="text-[10px] text-white/40">{p.m}</div>
                    </div>
                    <button
                      className={`flex h-8 items-center gap-1 rounded-lg px-2.5 text-[11px] font-semibold transition-colors ${
                        p.added
                          ? "border border-white/10 bg-white/[0.04] text-white/55"
                          : "bg-[#5B9DF0] text-[#06203a] hover:bg-[#7FB5F5]"
                      }`}
                    >
                      {p.added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {p.added ? "Added" : "Add"}
                    </button>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* E — Social feed (wide) */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <SpotlightCard spotlight="amber" className="h-full p-7">
              <Eyebrow icon={LayoutGrid} label="Social feed" />
              <h3 className="text-xl font-medium text-white">A feed that feels like home</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/50">
                Posts, photos and reactions from the people who actually share your campus —
                in real time, in chronological order, no algorithm games.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* F — reactions */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <SpotlightCard className="flex h-full flex-col p-7">
              <Eyebrow icon={Heart} label="Reactions" />
              <h3 className="text-lg font-medium text-white">Likes &amp; comments</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                React, reply and keep the conversation going on any post.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* G — campus events */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SpotlightCard className="flex h-full items-center gap-4 p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <CalendarDays className="h-5 w-5 text-white/55" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Campus events</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  See what&apos;s happening this week and RSVP alongside your friends.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
