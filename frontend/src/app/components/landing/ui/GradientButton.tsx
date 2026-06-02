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
    primary: "bg-[#5B9DF0] text-black hover:bg-[#5B9DF0]/90 hover:shadow-lg hover:shadow-[#5B9DF0]/15",
    secondary: "bg-[#5B9DF0]/10 text-white border border-[#5B9DF0]/25 hover:bg-[#5B9DF0]/15 hover:border-[#5B9DF0]/35",
    outline: "bg-transparent text-[#5B9DF0] border border-[#5B9DF0]/35 hover:bg-[#5B9DF0]/10"
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
