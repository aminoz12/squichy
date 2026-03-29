"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Mobile-only sticky bar: keeps conversion CTA visible while scrolling.
 */
export function StickyMobileCTA() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-pink-200 bg-card/95 p-3 shadow-[0_-8px_30px_rgba(236,72,153,0.15)] backdrop-blur-md md:hidden"
      initial={reduce ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.45 }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href="#pricing"
          className="flex-1 rounded-2xl bg-accent py-3.5 text-center text-sm font-extrabold text-white shadow-md shadow-accent/30"
        >
          Buy now
        </a>
        <a
          href="#faq"
          className="rounded-2xl border-2 border-pink-200 px-4 py-3.5 text-sm font-extrabold text-foreground"
        >
          FAQ
        </a>
      </div>
    </motion.div>
  );
}
