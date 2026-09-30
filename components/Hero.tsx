import Image from "next/image";
import Link from "next/link";
import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";
import { products } from "@/lib/data";

const HERO_IMAGE = "/hero-squish.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative z-10">
          <span className="eyebrow-pill text-xs uppercase tracking-wide sm:text-sm">
            ✦ Big squish energy
          </span>
          <h1 className="mt-5 font-[family-name:var(--font-fredoka)] text-[3rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
            A little squish.
            <br />
            <span className="marker-word text-pink-pop">A lot of happy.</span>
          </h1>
          <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-ink-2 sm:text-lg">
            Dumplings, bakery treats, crunchy ASMR and chonky cats.{" "}
            {products.length}+ squishy toys from just $7.99.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="btn-squish text-base sm:text-lg"
            >
              Find your squishy →
            </Link>
            <Link
              href="/collections/boxes-gift-sets"
              className="btn-squish btn-sun text-sm sm:text-base"
            >
              🎁 Gift sets
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-ink">
            <span>🚚 Free delivery ${FREE_DELIVERY_THRESHOLD_USD}+</span>
            <span>⭐ 12,400+ happy families</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[540px] px-5 pb-5 pt-8 sm:px-8">
          <div className="rotate-2 overflow-hidden rounded-[38px] border-[3px] border-ink bg-pink-soft shadow-[10px_12px_0_var(--ink)]">
            <div className="relative aspect-square">
              <Image
                src={HERO_IMAGE}
                alt="Colorful squishy dumplings, ice cubes and a chonky kitten floating around a giant glitter dumpling being stretched by a hand"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -top-1 right-0 grid h-28 w-28 rotate-12 place-items-center rounded-full border-[2.5px] border-ink bg-sun text-center font-[family-name:var(--font-fredoka)] text-sm font-bold leading-none text-ink shadow-[3px_3px_0_var(--ink)] sm:right-2">
            <div>
              from
              <b className="mt-1 block text-2xl">$7.99</b>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 grid h-24 w-24 -rotate-12 place-items-center rounded-full border-[2.5px] border-ink bg-mint text-center font-[family-name:var(--font-fredoka)] text-sm font-bold leading-none text-ink shadow-[3px_3px_0_var(--ink)] sm:left-2">
            <div>
              2 + 1
              <b className="mt-1 block text-xl">FREE</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
