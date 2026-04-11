"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CLIENT_VIDEOS = [
  { src: "/dumpling-1-trimmed.mp4", label: "Happy client 1" },
  { src: "/dumpling-2-trimmed.mp4", label: "Happy client 2" },
  { src: "/dumpling-3-trimmed.mp4", label: "Happy client 3" },
  { src: "/videoreview.mp4", label: "Happy client 4" },
  { src: "/dumplings-5.mp4", label: "Happy client 5" },
  { src: "/dumpling-3-trimmed.mp4", label: "Happy client 6" },
];

const GAP = 16; // gap-4 = 1rem = 16px
const AUTO_SPEED = 0.5; // px per frame (~30 px/s at 60 fps)

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoCard({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={togglePlay}
      className="group relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 shadow-lg ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
      aria-label={label}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Play overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110">
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="6" y="4" width="4" height="16" rx="1" fill="#1f1523" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="#1f1523" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" fill="#1f1523" />
            </svg>
          )}
        </div>
      </div>
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </button>
  );
}

type HappyClientsProps = {
  className?: string;
};

export function HappyClients({ className = "" }: HappyClientsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0); // current translateX offset (negative = scrolled right)
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  // Triple the list for seamless infinite loop
  const tripled = [...CLIENT_VIDEOS, ...CLIENT_VIDEOS, ...CLIENT_VIDEOS];

  /** Measure width of one full set of cards */
  const getSingleSetWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>(".video-card-wrap");
    const cardW = card?.offsetWidth ?? 200;
    return CLIENT_VIDEOS.length * (cardW + GAP);
  }, []);

  /** Wrap offset so it stays within the middle copy of the tripled list */
  const wrapOffset = useCallback(
    (offset: number) => {
      const setW = getSingleSetWidth();
      if (setW === 0) return offset;
      // Keep offset between 0 and -2*setW (the middle and last copies)
      // We start at -setW (middle copy beginning)
      while (offset > 0) offset -= setW;
      while (offset < -2 * setW) offset += setW;
      return offset;
    },
    [getSingleSetWidth]
  );

  /** Apply offset to DOM directly (no React re-render needed) */
  const applyOffset = useCallback(() => {
    const el = trackRef.current;
    if (el) {
      el.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, []);

  /** Auto-scroll loop */
  useEffect(() => {
    // Initialise offset to the start of the middle copy
    const setW = getSingleSetWidth();
    if (setW > 0) {
      offsetRef.current = -setW;
      applyOffset();
    }

    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current -= AUTO_SPEED;
        offsetRef.current = wrapOffset(offsetRef.current);
        applyOffset();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [getSingleSetWidth, wrapOffset, applyOffset]);

  /** Smooth manual scroll triggered by arrow buttons */
  const animatingRef = useRef(false);

  const scroll = useCallback(
    (dir: -1 | 1) => {
      if (animatingRef.current) return; // prevent overlapping animations
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>(".video-card-wrap");
      const cardW = card?.offsetWidth ?? 200;
      const distance = (cardW + GAP) * 2; // scroll 2 cards

      // Pause auto-scroll while animating
      pausedRef.current = true;
      animatingRef.current = true;

      const startOffset = offsetRef.current;
      const endOffset = wrapOffset(startOffset + dir * -distance);
      const duration = 400; // ms
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const ease = 1 - Math.pow(1 - t, 3);
        offsetRef.current = startOffset + (endOffset - startOffset) * ease;
        applyOffset();

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          offsetRef.current = wrapOffset(endOffset);
          applyOffset();
          animatingRef.current = false;
          // Resume auto-scroll after a short delay
          setTimeout(() => {
            pausedRef.current = false;
          }, 2000);
        }
      };
      requestAnimationFrame(animate);
    },
    [wrapOffset, applyOffset]
  );

  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!animatingRef.current) {
      pausedRef.current = false;
    }
  }, []);

  return (
    <section
      id="happy-clients"
      className={`relative overflow-hidden bg-gradient-to-b from-stone-50/90 to-white border-t border-stone-200/80 ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
            Social Proof
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Loved by{" "}
            <span className="relative inline-block">
              <span className="relative z-10">9,500+</span>
              <span
                className="absolute left-0 right-0 bottom-0 h-[40%] bg-primary/40 rounded-sm -z-0"
                aria-hidden
              />
            </span>
          </h2>
        </div>

        {/* Carousel with infinite auto-scroll + manual arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg ring-1 ring-stone-900/10 transition-all duration-200 text-stone-700 hover:bg-white hover:scale-110 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg ring-1 ring-stone-900/10 transition-all duration-200 text-stone-700 hover:bg-white hover:scale-110 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable infinite track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 w-max py-2 px-6"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {tripled.map((v, i) => (
                <div key={i} className="flex-shrink-0 video-card-wrap">
                  <VideoCard src={v.src} label={v.label} />
                </div>
              ))}
            </div>
          </div>

          {/* Left edge fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-stone-50/90 to-transparent z-10"
            aria-hidden
          />
          {/* Right edge fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-stone-50/90 to-transparent z-10"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
