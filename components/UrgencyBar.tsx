"use client";

import { useEffect, useMemo, useState } from "react";
import { product } from "@/lib/data";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * Fake urgency bar. The live clock uses Date/timezone — only rendered after
 * mount so SSR HTML matches the client (avoids hydration mismatch).
 */
export function UrgencyBar() {
  const end = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }, []);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = mounted ? Math.max(0, end - now) : 0;
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const isLowStock = product.stockRemaining <= 60;

  return (
    <div className="border-b border-amber-300/70 bg-gradient-to-r from-[#fff5d9] via-[#fff0bf] to-[#ffe4a3] px-4 py-2.5 text-center text-xs font-semibold text-[#3c2a00] sm:text-sm">
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        <span className="rounded-full border border-amber-300/70 bg-white/90 px-3 py-1 shadow-sm">
          Flash offer ends in{" "}
          <span className="tabular-nums font-black text-[#7c3aed]">
            {mounted ? `${pad(h)}h ${pad(m)}m ${pad(s)}s` : "––h ––m ––s"}
          </span>
        </span>
        <span className="hidden text-amber-700/70 sm:inline">•</span>
        <span className="rounded-full bg-[#2d2384] px-3 py-1 font-black uppercase tracking-wide text-white">
          {isLowStock ? "Almost gone" : "Trending now"}
        </span>
        <span className="font-bold">
          Only <strong className="text-[#e11d48]">{product.stockRemaining}</strong> left at
          this drop price
        </span>
      </span>
    </div>
  );
}
