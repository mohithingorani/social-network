"use client";

import { motion } from "framer-motion";
import {
  Home,
  Compass,
  MessageCircle,
  Network,
  CalendarDays,
  Bell,
  Search,
  Heart,
  MessageSquare,
  Share2,
  ImagePlus,
  Plus,
  Check,
} from "lucide-react";

/* ---------- shared bits ---------- */

function Avatar({
  initials,
  from,
  to,
  size = "md",
  ring = false,
}: {
  initials: string;
  from: string;
  to: string;
  size?: "sm" | "md" | "lg";
  ring?: boolean;
}) {
  const dim =
    size === "sm" ? "w-7 h-7 text-[10px]" : size === "lg" ? "w-12 h-12 text-sm" : "w-9 h-9 text-xs";
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br ${from} ${to} flex items-center justify-center font-bold text-white/90 shrink-0 ${
        ring ? "ring-2 ring-[#0a0a0a]" : ""
      }`}
    >
      {initials}
    </div>
  );
}

const navItems = [
  { icon: Home, label: "Feed", active: true },
  { icon: Compass, label: "Discover", active: false },
  { icon: MessageCircle, label: "Messages", active: false, badge: 3 },
  { icon: Network, label: "Graph", active: false },
  { icon: CalendarDays, label: "Events", active: false },
];

/* ---------- the window ---------- */

export function ProductMockup() {
  return (
    <div className="relative w-full">
      <div className="relative rounded-[18px] border border-white/[0.1] bg-[#0c0c0e] shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* top chrome */}
        <div className="flex items-center gap-3 px-4 h-11 border-b border-white/[0.07] bg-white/[0.015]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
          </div>
          <div className="mx-auto flex items-center gap-2 px-3 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B9DF0]" />
            univo.app/feed
          </div>
          <span className="text-[10px] tracking-widest text-white/25">LIVE</span>
        </div>

        <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr_252px] h-[520px]">
          {/* ---------- sidebar ---------- */}
          <aside className="border-r border-white/[0.07] p-3 flex flex-col gap-1 bg-white/[0.012]">
            <div className="flex items-center gap-2 px-2 h-10 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7FB5F5] to-[#5B9DF0] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
                U
              </div>
              <span className="hidden sm:block text-white font-medium text-sm tracking-wide">
                UNIVO
              </span>
            </div>

            {navItems.map((n) => (
              <div
                key={n.label}
                className={`flex items-center gap-3 px-2.5 h-10 rounded-xl text-sm transition-colors ${
                  n.active
                    ? "bg-white/[0.06] text-white border border-white/[0.08]"
                    : "text-white/45 hover:text-white/70"
                }`}
              >
                <n.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="hidden sm:block flex-1 truncate">{n.label}</span>
                {n.badge ? (
                  <span className="hidden sm:flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#5B9DF0] text-[#0a0a0a] text-[10px] font-bold">
                    {n.badge}
                  </span>
                ) : null}
              </div>
            ))}

            <div className="mt-auto hidden sm:flex items-center gap-2.5 px-2 py-2 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <Avatar initials="MH" from="from-[#5B9DF0]" to="to-[#2b5a8a]" size="sm" />
              <div className="min-w-0">
                <div className="text-white text-xs font-medium truncate">Mohit H.</div>
                <div className="text-white/35 text-[10px] truncate">@mohit · CS ’26</div>
              </div>
            </div>
          </aside>

          {/* ---------- feed ---------- */}
          <main className="overflow-hidden p-4 space-y-3.5">
            {/* search + composer */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 h-11 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white/30 text-xs">
                <Search className="w-3.5 h-3.5" />
                Search people, posts, events…
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center relative">
                <Bell className="w-4 h-4 text-white/45" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#5B9DF0]" />
              </div>
            </div>

            {/* photo post */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5"
            >
              <header className="flex items-center gap-2.5 mb-3">
                <Avatar initials="PP" from="from-[#5B9DF0]" to="to-[#3F6FB0]" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-semibold leading-tight">Priya Patel</div>
                  <div className="text-white/35 text-[11px]">@priya_p · Design ’25 · 20m</div>
                </div>
                <span className="text-white/25 text-lg leading-none">···</span>
              </header>
              <p className="text-white/70 text-[13px] leading-relaxed mb-3">
                Golden hour from the quad tonight 🌇 spring semester really does hit different.
              </p>
              {/* photo */}
              <div className="relative h-36 rounded-xl overflow-hidden border border-white/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5B9DF0]/35 via-[#3f6fb5]/20 to-[#5B9DF0]/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(205,224,255,0.45),transparent_45%)]" />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] text-white/70 bg-black/30 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                  📍 North Quad
                </span>
              </div>
              <footer className="flex items-center gap-5 mt-3 text-white/45 text-[12px]">
                <span className="flex items-center gap-1.5 text-[#5B9DF0]">
                  <Heart className="w-4 h-4 fill-[#5B9DF0]" /> 54
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> 7
                </span>
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Share
                </span>
                <div className="ml-auto flex -space-x-2">
                  <Avatar initials="A" from="from-[#7c6cf0]" to="to-[#4b3fb0]" size="sm" ring />
                  <Avatar initials="R" from="from-[#e07a9a]" to="to-[#a8466a]" size="sm" ring />
                  <Avatar initials="V" from="from-[#5fae8f]" to="to-[#357a5f]" size="sm" ring />
                </div>
              </footer>
            </motion.article>

            {/* event card */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#5B9DF0]/[0.07] to-transparent p-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#5B9DF0]/15 border border-[#5B9DF0]/25 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[#A9CDF5] text-[9px] font-semibold leading-none uppercase">Fri</span>
                  <span className="text-white text-base font-bold leading-tight">14</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-semibold">Spring Music Fest · Main Lawn</div>
                  <div className="text-white/40 text-[11px]">Friday · 8 PM · open to your campus</div>
                </div>
                <button className="px-3 h-8 rounded-lg bg-[#5B9DF0] text-[#06203a] text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Going
                </button>
              </div>
            </motion.article>

            {/* quick composer hint */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-dashed border-white/[0.08] px-3.5 py-3 text-white/30 text-xs">
              <ImagePlus className="w-4 h-4" />
              Share a moment with your campus…
            </div>
          </main>

          {/* ---------- right rail ---------- */}
          <aside className="hidden lg:flex flex-col gap-3 border-l border-white/[0.07] p-4 bg-white/[0.012]">
            {/* active now */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] pulse-ring" />
                <span className="text-white/40 text-[10px] font-semibold tracking-wider uppercase">
                  Active now
                </span>
              </div>
              <div className="space-y-1">
                {[
                  { i: "AR", n: "Ananya R.", s: "from-[#7c6cf0]", e: "to-[#4b3fb0]" },
                  { i: "VT", n: "Vikram T.", s: "from-[#5fae8f]", e: "to-[#357a5f]" },
                  { i: "SK", n: "Sneha K.", s: "from-[#e07a9a]", e: "to-[#a8466a]" },
                ].map((p) => (
                  <div key={p.i} className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-lg hover:bg-white/[0.03]">
                    <div className="relative">
                      <Avatar initials={p.i} from={p.s} to={p.e} size="sm" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#28c840] ring-2 ring-[#0c0c0e]" />
                    </div>
                    <span className="text-white/70 text-xs truncate">{p.n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* live chat bubble */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
              <div className="flex items-center gap-2 mb-2.5">
                <Avatar initials="AR" from="from-[#7c6cf0]" to="to-[#4b3fb0]" size="sm" />
                <div className="min-w-0">
                  <div className="text-white text-xs font-medium leading-tight">Ananya R.</div>
                  <div className="text-[#5B9DF0] text-[10px]">online</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.05] px-2.5 py-1.5 text-white/70 text-[11px]">
                  see you at the library? 📚
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#5B9DF0] px-2.5 py-1.5 text-[#0a0a0a] text-[11px] font-medium">
                  omw — grabbing chai first ☕
                </div>
                <div className="flex items-center gap-1 pl-1 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" />
                  <span className="text-white/30 text-[10px] ml-1">typing…</span>
                </div>
              </div>
            </div>

            {/* people you may know */}
            <div>
              <div className="text-white/40 text-[10px] font-semibold tracking-wider uppercase mb-2.5">
                People you may know
              </div>
              <div className="space-y-2">
                {[
                  { i: "RV", n: "Rahul Verma", m: "12 mutual", s: "from-[#4a86d9]", e: "to-[#2b5a8a]" },
                  { i: "JK", n: "Jordan Kim", m: "8 mutual", s: "from-[#5fae8f]", e: "to-[#357a5f]" },
                ].map((p) => (
                  <div key={p.i} className="flex items-center gap-2.5">
                    <Avatar initials={p.i} from={p.s} to={p.e} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate">{p.n}</div>
                      <div className="text-white/35 text-[10px]">{p.m}</div>
                    </div>
                    <button className="w-7 h-7 rounded-lg bg-[#5B9DF0]/15 border border-[#5B9DF0]/25 flex items-center justify-center text-[#A9CDF5] hover:bg-[#5B9DF0]/25 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
