import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/herosqueeze.png";

export function Hero() {
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

      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border-2 border-[#2b2282] bg-[#4b1ec2] shadow-[0_24px_60px_-20px_rgba(43,34,130,0.65)]"
      >
        <div className="mx-4 mt-4 flex items-center justify-between rounded-lg bg-[#2d2384] px-4 py-3 text-white sm:mx-6 sm:mt-5 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#ff2f9f] px-2 py-1 font-[family-name:var(--font-fredoka)] text-xs font-black uppercase tracking-wide sm:text-sm">
              Crazy Fun
            </span>
            <span className="hidden text-[11px] font-extrabold uppercase tracking-wide text-white/85 sm:inline">
              🔥 LIMITED TIME · BUY 2 GET 1 FREE
            </span>
          </div>
          <Link
            href="/products/mystery-dumpling"
            className="animate-pulse text-[11px] font-extrabold uppercase tracking-wide text-yellow-300 hover:text-yellow-100 sm:text-xs"
          >
            CLAIM OFFER →
          </Link>
        </div>

        <div className="relative grid min-h-[340px] items-center gap-8 px-6 pb-8 pt-7 sm:min-h-[420px] sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e53e3e] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg sm:text-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-300" />
              Limited Stock — Selling Fast!
            </div>
            <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.2)] sm:text-5xl lg:text-[3.4rem]">
              THE SQUISHY DUMPLING YOUR KIDS WON&apos;T STOP TALKING ABOUT
            </h1>
            <p className="mt-4 max-w-md text-sm font-bold leading-relaxed text-yellow-200 sm:text-base">
              It&apos;s finally here — but NOT for long. The TikTok-viral Squishy Bun everyone is
              obsessing over. Grab yours before they&apos;re gone! 🥟
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/products/mystery-dumpling"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-[#ffd500] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-[0_4px_20px_rgba(255,213,0,0.5)] transition-all hover:scale-105 hover:shadow-[0_6px_30px_rgba(255,213,0,0.7)] sm:text-base"
              >
                BUY 2 GET 1 NOW
              </Link>
              <span className="text-xs font-semibold text-white/70">
                ⭐ 12,400+ happy families
              </span>
            </div>
          </div>

          <div
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
          </div>
        </div>
      </div>
    </section>
  );
}
