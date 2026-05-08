"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  icon?: ReactNode;
}

export function GradientButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary", 
  className = "",
  icon 
}: GradientButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10"
  };

  const button = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
      {icon}
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href}>
        {button}
      </Link>
    );
  }

  return button;
}