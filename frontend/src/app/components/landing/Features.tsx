"use client";

import { GlassCard } from "./ui/GlassCard";
import { User, FolderKanban, MessageSquare, GitPullRequest, Users, BookOpen, Network, Briefcase, Github, Sparkles } from "lucide-react";

const features = [
  { icon: User, title: "Developer Profiles", description: "Showcase your skills, projects, and contributions with a portfolio-style profile." },
  { icon: FolderKanban, title: "Project Showcasing", description: "Share and discover open-source projects, side projects, and experiments." },
  { icon: MessageSquare, title: "Real-time Discussions", description: "Engage in tech conversations with real-time chat and discussion threads." },
  { icon: GitPullRequest, title: "Open Source Collaboration", description: "Find collaborators for your open-source projects and contribute together." },
  { icon: Users, title: "Tech Communities", description: "Join communities focused on specific technologies, frameworks, and interests." },
  { icon: BookOpen, title: "Stories & Feed", description: "Share insights, tutorials, and tech stories with the community." },
  { icon: Network, title: "Developer Networking", description: "Connect with developers who share your interests and expertise." },
  { icon: Briefcase, title: "Portfolio Profiles", description: "Build a visual portfolio that highlights your best work and contributions." },
  { icon: Github, title: "GitHub Integration", description: "Sync your repositories, contributions, and coding activity automatically.", badge: "Coming Soon" },
  { icon: Sparkles, title: "AI-Powered Tools", description: "Intelligent code assistance and developer productivity enhancements.", badge: "Coming Soon" },
];

function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />
    </>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 px-4 relative">
      <SectionBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-white/40 font-medium tracking-wider uppercase text-sm">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            Everything You Need to Thrive
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A comprehensive platform designed to help developers connect, collaborate, and grow their careers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="h-full">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-white/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                    {feature.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-white/30 border border-white/5">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/30 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}