"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/** Served from /public/herosqueeze.png */
const HERO_IMAGE = "/herosqueeze.png";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-bright/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-dark shadow-sm"
          >
            Over 10,000 sold
            <span className="h-1 w-1 rounded-full bg-accent" />
            TikTok famous
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-[family-name:var(--font-fredoka)] text-4xl font-bold uppercase leading-[1.08] tracking-wide text-foreground sm:text-5xl lg:text-6xl"
          >
            You won’t know which dumpling you get{" "}
            <span className="inline-block" aria-hidden>
              😱
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 max-w-xl text-base font-medium text-muted sm:text-lg"
          >
            Slow-rise, pocket-sized chaos — each one’s a blind drop. Squeeze
            the stress away and see which dumpling picks you.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/products#offer"
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Buy now
            </a>
            <a
              href="#buzz"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-pink-200 bg-white px-6 py-3.5 text-base font-bold text-foreground shadow-sm transition hover:border-accent/50"
            >
              See the vibe
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex items-center gap-3 text-sm text-muted"
          >
            <div className="flex -space-x-2" aria-hidden>
              {["bg-pink-300", "bg-violet-300", "bg-amber-200"].map((c) => (
                <span
                  key={c}
                  className={`inline-block h-9 w-9 rounded-full border-2 border-white ${c}`}
                />
              ))}
            </div>
            <p className="max-w-xs font-semibold text-foreground/80">
              Join thousands of unboxings — free shipping vibes on select drops.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-pink-200/80 bg-white shadow-2xl shadow-pink-300/40">
            <Image
              src={HERO_IMAGE}
              alt="SquishyBun Dumplings — hero product shot"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-3 text-sm font-bold text-foreground shadow-lg backdrop-blur-sm">
              Mystery grade: S-tier squish ✨
            </div>
          </div>

          {!reduce && (
            <motion.div
              className="pointer-events-none absolute -right-4 -top-4 hidden rounded-2xl bg-primary px-4 py-2 text-sm font-extrabold text-foreground shadow-lg sm:block"
              animate={{ rotate: [-6, 6, -6], y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Blind drop
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
