"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Users, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const mockFeedPosts = [
  { name: "Alex Rivera", handle: "@arivera", time: "2m", content: "Just pushed a major update to my open-source project! 🚀 The new caching layer reduced API calls by 80%.", likes: 24, comments: 8 },
  { name: "Priya Sharma", handle: "@priya_s", time: "15m", content: "Finally finished my portfolio redesign. Would love some feedback from the community! 🎨", likes: 41, comments: 12 },
  { name: "Jordan Kim", handle: "@jkim_dev", time: "1h", content: "Hot take: Tailwind is better for rapid prototyping, but CSS modules scale better for large apps.", likes: 67, comments: 34 },
];

const mockMessages = [
  { name: "Sarah Chen", last: "See you at the meetup!", time: "2m", unread: 2 },
  { name: "Marcus J.", last: "Thanks for the PR review!", time: "18m", unread: 0 },
  { name: "Elena R.", last: "Let's collaborate on the API", time: "1h", unread: 0 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 mb-6">
              <MessageCircle className="w-3 h-3 text-white/40" />
              <span className="text-white/40 text-xs tracking-wide">Connect with friends in real-time</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your Social World,<br />
              <span className="text-white/60">Reimagined</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 mb-8 max-w-xl mx-auto lg:mx-0">
              Share moments, discover friends, and chat instantly — all in one beautifully crafted social experience built for college students.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="/signin"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                Explore Features
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-[#18181A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                  </div>
                  <div className="text-white/30 text-xs font-mono">univo.chat</div>
                </div>

                <div className="flex">
                  <div className="w-14 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
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
                          transition={{ delay: 0.2 + i * 0.15 }}
                          className="bg-[#0f0f10] border border-white/5 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">{post.name.split(" ").map(n => n[0]).join("")}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-xs font-medium">{post.name}</div>
                              <div className="text-white/30 text-[10px]">{post.handle} · {post.time}</div>
                            </div>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed mb-3">{post.content}</p>
                          <div className="flex items-center gap-4 text-white/30 text-[10px]">
                            <span className="flex items-center gap-1">♥ {post.likes}</span>
                            <span className="flex items-center gap-1">💬 {post.comments}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="w-48 border-l border-white/5 p-3 space-y-2 bg-[#0f0f10]/50">
                      <div className="text-white/20 text-[10px] font-medium mb-2 px-1">MESSAGES</div>
                      {mockMessages.map((msg) => (
                        <div key={msg.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">{msg.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-medium">{msg.name}</div>
                            <div className="text-white/30 text-[10px] truncate">{msg.last}</div>
                          </div>
                          {msg.unread > 0 && (
                            <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">{msg.unread}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}