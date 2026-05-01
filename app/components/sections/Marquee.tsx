"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function Marquee({ text, className, speed = 40 }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-gray-100 py-2 ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="inline-flex items-center gap-16 pr-16">
          <span className="text-sm font-black text-gray-600 whitespace-nowrap">
            {text}
          </span>
          <span className="text-sm font-black text-gray-600 whitespace-nowrap">
            {text}
          </span>
          <span className="text-sm font-black text-gray-600 whitespace-nowrap">
            {text}
          </span>
          <span className="text-sm font-black text-gray-600 whitespace-nowrap">
            {text}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
