"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const HERO_IMAGE = "/herosqueeze.png";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-[#ff8a12] px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(1200px 400px at -10% 40%, rgba(255,160,40,0.7), transparent 60%), radial-gradient(1200px 400px at 110% 70%, rgba(255,180,70,0.7), transparent 60%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border-2 border-[#2b2282] bg-[#4b1ec2] shadow-[0_24px_60px_-20px_rgba(43,34,130,0.65)]"
      >
        <div className="mx-4 mt-4 flex items-center justify-between rounded-lg bg-[#2d2384] px-4 py-3 text-white sm:mx-6 sm:mt-5 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#ff2f9f] px-2 py-1 font-[family-name:var(--font-fredoka)] text-xs font-black uppercase tracking-wide sm:text-sm">
              Crazy Fun
            </span>
            <span className="hidden text-[11px] font-extrabold uppercase tracking-wide text-white/85 sm:inline">
              WILDLY TRENDY · RIDICULOUSLY VIRAL
            </span>
          </div>
          <a
            href="/products#offer"
            className="text-[11px] font-extrabold uppercase tracking-wide text-white hover:text-yellow-200 sm:text-xs"
          >
            BUY NOW
          </a>
        </div>

        <div className="relative grid min-h-[340px] items-center gap-8 px-6 pb-8 pt-7 sm:min-h-[420px] sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div className="relative z-10">
            <h1 className="font-[family-name:var(--font-fredoka)] text-4xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.2)] sm:text-5xl lg:text-6xl">
              DUMPLING MANIA
              <br />
              IS TAKING OVER!
            </h1>
            <p className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-white/90 sm:text-base">
              The TikTok phenomenon you will not be able to put down. The viral
              Squishy Bun that turns scrolling into obsession.
            </p>
            <a
              href="/products#offer"
              className="mt-6 inline-flex rounded-lg bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-lg transition hover:brightness-105"
            >
              BUY NOW
            </a>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative z-10 mx-auto w-full max-w-[600px]"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={HERO_IMAGE}
                alt="Squishy Bun hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3f169f]/45 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
