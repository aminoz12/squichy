"use client";

import { useEffect, useRef, useState } from "react";

function ReelCard({ src, stagger }: { src: string; stagger?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-10% 0px", threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      // play() can reject before media data is ready — retry once loadable.
      const tryPlay = () => void v.play().catch(() => {});
      tryPlay();
      v.addEventListener("canplay", tryPlay);
      return () => v.removeEventListener("canplay", tryPlay);
    }
    v.pause();
  }, [inView]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full min-w-0 sm:max-w-none ${
        stagger ? "-translate-y-3" : ""
      }`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] border-[2.5px] border-white transition-transform duration-200 ease-[cubic-bezier(0.3,1.6,0.5,1)] hover:-rotate-1 hover:scale-[1.03]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
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
 * Dark ink section with white-bordered 9:16 reel tiles — videos only.
 */
export function BuzzEverywhere({ videos }: BuzzEverywhereProps) {
  return (
    <section
      id="buzz"
      className="relative scroll-mt-24 bg-ink py-16 text-white sm:py-20"
      aria-labelledby="buzz-heading"
    >
      <h2
        id="buzz-heading"
        className="px-4 text-center font-[family-name:var(--font-fredoka)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        The buzz is <span className="text-sun">everywhere!</span>
      </h2>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-4 sm:gap-5 sm:pb-0">
          {videos.map((src, i) => (
            <ReelCard key={src} src={src} stagger={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
