"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Users, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { TiltCard } from "./ui";

const mockFeedPosts = [
  { name: "Arjun Sharma", handle: "@arjun_s", time: "3m", content: "Does anyone know if the campus library is open 24/7 during finals week?", likes: 18, comments: 12 },
  { name: "Priya Patel", handle: "@priya_p", time: "20m", content: "The sunset from the quad tonight was absolutely beautiful. Spring semester hit different.", likes: 54, comments: 7 },
  { name: "Rahul Verma", handle: "@rahulv", time: "1h", content: "Study group at the chai stall near the mess — who's coming? We still have three chapters to cover.", likes: 31, comments: 15 },
];

const mockMessages = [
  { name: "Ananya R.", last: "See you at the library!", time: "1m", unread: 2 },
  { name: "Vikram T.", last: "That was so funny lmao", time: "15m", unread: 0 },
  { name: "Sneha K.", last: "Thanks for the notes!", time: "2h", unread: 0 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      {/* Subtle accent glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(211,150,91,0.11),transparent)] blur-3xl" />
      <div className="absolute -bottom-32 right-[-160px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(102,164,175,0.14),transparent)] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 mb-6">
              <MessageCircle className="w-3 h-3 text-white/40" />
              <span className="text-white/40 text-xs tracking-wide">Connect with your campus community</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Where Campus<br />
              <span className="text-white/60">Comes Alive</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg md:text-xl text-white/50 mb-8 max-w-xl mx-auto lg:mx-0">
              Share moments with friends, discover people on campus, and chat in real-time — all in one place built for college life.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="/signin"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm rounded-xl bg-white/[0.03] border border-white/12 text-white/85 hover:bg-white/[0.06] hover:border-white/15 transition-colors"
              >
                Explore Features
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Floating badges */}
              <div className="hidden md:block absolute -left-6 -top-6 z-20">
                <div className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-[10px] uppercase tracking-wider text-white/35">Realtime</div>
                  <div className="text-xs font-medium text-white/75">Chats + reactions</div>
                </div>
              </div>
              <div className="hidden md:block absolute -right-6 bottom-10 z-20">
                <div className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-[10px] uppercase tracking-wider text-white/35">Network</div>
                  <div className="text-xs font-medium text-white/75">Discover friends</div>
                </div>
              </div>

              <TiltCard className="relative">
                <div
                  className="rounded-3xl hidden xl:inline-block overflow-hidden border border-white/20 bg-[#0f0f10]/70 backdrop-blur-xl shadow-[0_25px_90px_rgba(0,0,0,0.55)]"
                
                >
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                    </div>
                    <div className="ml-auto text-[10px] text-white/35 tracking-wide">UNIVO PREVIEW</div>
                  </div>

                  <div className="flex">
                    <div className="w-14 border-r border-white/10 flex flex-col items-center py-4 gap-4">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-blue-300" />
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <Users className="w-4 h-4 text-white/30" />
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white/30" />
                      </div>
                    </div>

                    <div className="flex-1 flex">
                      <div className="flex-1 p-4 space-y-4 max-w-sm mx-auto">
                        {mockFeedPosts.map((post, i) => (
                          <motion.div
                            key={post.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.15 }}
                            className="bg-white/[0.03] border border-white/10 rounded-2xl p-4"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">
                                  {post.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white text-xs font-medium">{post.name}</div>
                                <div className="text-white/30 text-[10px]">
                                  {post.handle} · {post.time}
                                </div>
                              </div>
                            </div>
                            <p className="text-white/55 text-xs leading-relaxed mb-3">{post.content}</p>
                            <div className="flex items-center gap-4 text-white/30 text-[10px]">
                              <span className="flex items-center gap-1">♥ {post.likes}</span>
                              <span className="flex items-center gap-1">💬 {post.comments}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="w-48 border-l border-white/10 p-3 space-y-2 bg-black/10">
                        <div className="text-white/25 text-[10px] font-medium mb-2 px-1 tracking-wide">
                          MESSAGES
                        </div>
                        {mockMessages.map((msg) => (
                          <div
                            key={msg.name}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px] font-bold">
                                {msg.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-xs font-medium">{msg.name}</div>
                              <div className="text-white/30 text-[10px] truncate">{msg.last}</div>
                            </div>
                            {msg.unread > 0 && (
                              <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                                {msg.unread}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
