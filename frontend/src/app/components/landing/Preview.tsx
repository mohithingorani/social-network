"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LayoutGrid, MessageCircle, Compass, Network } from "lucide-react";

/* ---------- flow content ---------- */

function FeedFlow() {
  return (
    <div className="space-y-3">
      {[
        { i: "SC", n: "Sarah Chen", t: "2h", c: "from-[#5B9DF0] to-[#3F6FB0]", photo: true, body: "Sunset at the campus quad 🌇", l: 42, cm: 8 },
        { i: "MJ", n: "Marcus J.", t: "5h", c: "from-[#5fae8f] to-[#357a5f]", photo: false, body: "Study group at the library tonight — who's in? Two chapters left.", l: 28, cm: 5 },
      ].map((p) => (
        <div key={p.i} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${p.c} text-[10px] font-bold text-white`}>{p.i}</div>
            <div>
              <div className="text-[13px] font-medium text-white">{p.n}</div>
              <div className="text-[10px] text-white/35">{p.t} ago</div>
            </div>
          </div>
          {p.photo && (
            <div className="mb-2.5 h-28 rounded-lg bg-gradient-to-tr from-[#5B9DF0]/30 via-[#3f6fb5]/15 to-[#5B9DF0]/25" />
          )}
          <p className="text-[12px] leading-relaxed text-white/55">{p.body}</p>
          <div className="mt-2.5 flex items-center gap-4 text-[11px] text-white/35">
            <span className="text-[#5B9DF0]">♥ {p.l}</span>
            <span>💬 {p.cm}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatFlow() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#5B9DF0] to-[#3F6FB0] text-xs font-bold text-white">SC</div>
        <div className="flex-1">
          <div className="text-[13px] font-medium text-white">Sarah Chen</div>
          <div className="text-[10px] text-[#5B9DF0]">Online</div>
        </div>
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 space-y-2.5 py-3.5">
        <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-[12px] text-white/60">
          Hey! Coming to the study group tonight?
        </div>
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#5B9DF0] px-3 py-2 text-[12px] font-medium text-[#0a0a0a]">
          Yeah! I&apos;ll be there by 6 🙌
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-[12px] text-white/60">
          Should I bring snacks?
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-[12px] text-white/30">
        Type a message…
      </div>
    </div>
  );
}

function DiscoverFlow() {
  const people = [
    { i: "RV", n: "Rahul Verma", d: "Engineering ’25", m: "12 mutual", c: "from-[#4a86d9] to-[#2b5a8a]" },
    { i: "JK", n: "Jordan Kim", d: "Computer Science ’26", m: "8 mutual", c: "from-[#5fae8f] to-[#357a5f]" },
    { i: "AL", n: "Aisha L.", d: "Design ’25", m: "5 mutual", c: "from-[#e07a9a] to-[#a8466a]" },
  ];
  return (
    <div className="space-y-2.5">
      {people.map((p) => (
        <div key={p.i} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${p.c} text-sm font-bold text-white`}>{p.i}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium text-white">{p.n}</div>
            <div className="text-[11px] text-white/40">{p.d} · {p.m}</div>
          </div>
          <button className="h-8 rounded-lg bg-[#5B9DF0] px-3 text-[11px] font-semibold text-[#06203a]">Connect</button>
        </div>
      ))}
    </div>
  );
}

function GraphFlow() {
  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="0 0 240 200" className="h-full max-h-[260px] w-full">
        {[
          [120, 30],
          [210, 80],
          [180, 170],
          [60, 170],
          [30, 80],
        ].map(([x, y], i) => (
          <line key={i} x1="120" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        ))}
        {[
          { x: 120, y: 30, c: "#7c6cf0", t: "Alex" },
          { x: 210, y: 80, c: "#5fae8f", t: "Priya" },
          { x: 180, y: 170, c: "#e07a9a", t: "Jordan" },
          { x: 60, y: 170, c: "#4a86d9", t: "Sam" },
          { x: 30, y: 80, c: "#5B9DF0", t: "Riley" },
        ].map((n) => (
          <g key={n.t}>
            <circle cx={n.x} cy={n.y} r="16" fill={n.c} fillOpacity="0.85" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-white" fontSize="10" fontWeight="700">{n.t[0]}</text>
          </g>
        ))}
        <circle cx="120" cy="100" r="24" fill="#5B9DF0" />
        <text x="120" y="104" textAnchor="middle" className="fill-[#0a0a0a]" fontSize="11" fontWeight="800">You</text>
      </svg>
    </div>
  );
}

const previews = [
  { icon: LayoutGrid, title: "Your Feed", description: "Posts from friends in real time", render: FeedFlow },
  { icon: MessageCircle, title: "Real-time Chat", description: "Message friends instantly", render: ChatFlow },
  { icon: Compass, title: "Discover People", description: "Find students near you", render: DiscoverFlow },
  { icon: Network, title: "Social Graph", description: "Explore your connections", render: GraphFlow },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Preview() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  const ActiveFlow = previews[active].render;

  return (
    <section id="tour" className="relative scroll-mt-20 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B9DF0]">
            Product tour
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl">
            See it in action
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg font-light text-white/50">
            Click through the moments that make up a day on UNIVO.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 lg:grid-cols-[300px_1fr]"
        >
          {/* tab rail */}
          <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5">
            {previews.map((p, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                    isActive
                      ? "border-white/[0.12] bg-white/[0.06]"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? "border-[#5B9DF0]/30 bg-[#5B9DF0]/15 text-[#5B9DF0]"
                        : "border-white/[0.08] bg-white/[0.03] text-white/45"
                    }`}
                  >
                    <p.icon className="h-[18px] w-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${isActive ? "text-white" : "text-white/70"}`}>{p.title}</div>
                    <div className="truncate text-xs text-white/40">{p.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* viewport */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d0d0f]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/55">
                {(() => {
                  const Icon = previews[active].icon;
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{previews[active].title}</div>
                <div className="text-xs text-white/35">{previews[active].description}</div>
              </div>
              <div className="ml-auto flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
              </div>
            </div>
            <motion.div
              key={active}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-h-[400px] p-5"
            >
              <ActiveFlow />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
