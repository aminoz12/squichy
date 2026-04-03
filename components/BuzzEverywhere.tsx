"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const BUZZ_ORANGE = "#FF7700";

function ReelCard({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35, margin: "-10% 0px" });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full min-w-0 sm:max-w-none"
    >
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
        style={{ borderRadius: "14px" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}

type BuzzEverywhereProps = {
  videos: readonly string[];
};

/**
 * Orange wave header + overlapping 9:16 reel row — videos only.
 */
export function BuzzEverywhere({ videos }: BuzzEverywhereProps) {
  return (
    <section
      id="buzz"
      className="relative scroll-mt-24 bg-white pb-14 pt-0 sm:pb-20"
      aria-labelledby="buzz-heading"
    >
      <div className="relative">
        <div
          className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-14"
          style={{ backgroundColor: BUZZ_ORANGE }}
        >
          <h2
            id="buzz-heading"
            className="relative z-[1] px-4 text-center font-[family-name:var(--font-buzz)] text-2xl font-black uppercase leading-tight tracking-wide text-white sm:text-4xl md:text-5xl"
          >
            The buzz is everywhere!
          </h2>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 leading-[0]"
            aria-hidden
          >
            <svg
              className="block h-[52px] w-full sm:h-[72px]"
              viewBox="0 0 1440 72"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M0,32 C240,72 480,0 720,32 C960,64 1200,8 1440,40 L1440,72 L0,72 Z"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-[4.5rem] max-w-6xl px-4 sm:-mt-[5.5rem] sm:px-6">
          <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-4 sm:gap-5 sm:pb-0">
            {videos.map((src) => (
              <ReelCard key={src} src={src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
