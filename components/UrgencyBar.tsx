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

  return (
    <div className="border-b border-pink-200/80 bg-gradient-to-r from-primary/40 via-white to-accent-bright/30 px-4 py-2 text-center text-xs font-semibold text-foreground sm:text-sm">
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm">
          Flash window ends in{" "}
          <span className="tabular-nums text-accent">
            {mounted ? `${pad(h)}:${pad(m)}:${pad(s)}` : "––:––:––"}
          </span>
        </span>
        <span className="text-muted">·</span>
        <span>
          Only <strong className="text-primary-dark">{product.stockRemaining}</strong>{" "}
          left at this drop price
        </span>
      </span>
    </div>
  );
}
