"use client";

import { motion } from "framer-motion";

interface PlaceholderImageProps {
  label: string;
  className?: string;
  aspectRatio?: "video" | "square" | "wide";
}

export function PlaceholderImage({ label, className = "", aspectRatio = "video" }: PlaceholderImageProps) {
  const aspectRatios = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[2/1]"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`
        relative
        ${aspectRatios[aspectRatio]}
        bg-[#151515] border border-white/5 rounded-lg
        flex items-center justify-center
        ${className}
      `}
    >
      <div className="text-center p-6">
        <div className="text-white/15 text-xs font-mono uppercase mb-2">
          [PLACEHOLDER]
        </div>
        <div className="text-white/30 text-sm font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}