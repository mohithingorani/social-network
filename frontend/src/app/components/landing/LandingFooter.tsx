"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Feed", href: "#features" },
    { label: "Messages", href: "#features" },
    { label: "Discover", href: "#features" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
  ],
  community: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export function LandingFooter() {
  return (
    <footer className="py-12 px-4 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/newlogo.svg" width={24} height={24} alt="logo" />
              <span className="text-white font-medium text-sm">UNIVO</span>
            </Link>
            <p className="text-white/30 text-xs mb-5 max-w-xs">
              A social network built for college students. Connect, share, and grow together.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5 text-white/30" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/60 font-medium mb-3 text-xs">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a className="text-white/30 hover:text-white/50 transition-colors text-xs" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 font-medium mb-3 text-xs">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a className="text-white/30 hover:text-white/50 transition-colors text-xs" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 font-medium mb-3 text-xs">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a className="text-white/30 hover:text-white/50 transition-colors text-xs" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} UNIVO CHAT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}