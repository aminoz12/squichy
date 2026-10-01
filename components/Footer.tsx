import Image from "next/image";
import Link from "next/link";
import { social } from "@/lib/data";

const PAYMENT_ICONS = [
  { src: "/mastercard.png", alt: "Mastercard" },
  { src: "/american-express.png", alt: "American Express" },
  { src: "/paypal.png", alt: "PayPal" },
  { src: "/visa.png", alt: "Visa" },
] as const;

const SHOP_LINKS = [
  { label: "All squishies", href: "/products" },
  { label: "Dumplings", href: "/collections/dumplings" },
  { label: "Bakery & Sweets", href: "/collections/bakery-sweets" },
  { label: "Sensory & ASMR 🔥", href: "/collections/sensory-asmr" },
  { label: "Animals", href: "/collections/animals" },
  { label: "Mystery Minis", href: "/collections/mystery-minis" },
] as const;

const GIFT_LINKS = [
  { label: "Gift sets", href: "/collections/boxes-gift-sets" },
  { label: "Advent calendars", href: "/collections/advent-calendars" },
] as const;

const HELP_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink pb-12 pt-14 text-[#e8dff5]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-fredoka)] text-xl font-semibold tracking-tight text-white">
            SquishyBun Dumplings<span className="text-pink-pop">.</span>
          </p>
          <p className="mt-3 max-w-[32ch] text-sm font-semibold text-[#e8dff5]/85">
            A little squish. A lot of happy. Squishy toys for desks, gifts and
            collections.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {PAYMENT_ICONS.map(({ src, alt }) => (
              <Image
                key={src}
                src={src}
                alt={alt}
                width={32}
                height={32}
                className="h-7 w-7 shrink-0 object-contain"
              />
            ))}
          </div>
        </div>

        <nav aria-label="Shop">
          <h4 className="mb-3 font-[family-name:var(--font-fredoka)] text-base font-semibold text-white">
            Shop
          </h4>
          {SHOP_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-1 text-sm font-semibold transition hover:text-sun"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Gifts">
          <h4 className="mb-3 font-[family-name:var(--font-fredoka)] text-base font-semibold text-white">
            Gifting
          </h4>
          {GIFT_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-1 text-sm font-semibold transition hover:text-sun"
            >
              {link.label}
            </Link>
          ))}
          <h4 className="mb-3 mt-6 font-[family-name:var(--font-fredoka)] text-base font-semibold text-white">
            Follow
          </h4>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-sun"
          >
            <Image src="/insta.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
            Instagram
          </a>
          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 text-sm font-semibold transition hover:text-sun"
          >
            <Image src="/tiktok.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
            TikTok
          </a>
        </nav>

        <nav aria-label="Help">
          <h4 className="mb-3 font-[family-name:var(--font-fredoka)] text-base font-semibold text-white">
            Help
          </h4>
          {HELP_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-1 text-sm font-semibold transition hover:text-sun"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/20 px-4 pt-6 text-xs font-semibold text-[#e8dff5]/70 sm:px-6 sm:text-sm">
        <Link href="/privacy" className="underline-offset-2 hover:text-sun hover:underline">
          Privacy
        </Link>
        {" · "}
        <Link href="/terms" className="underline-offset-2 hover:text-sun hover:underline">
          Terms
        </Link>
        {" · "}© {new Date().getFullYear()} SquishyBun Dumplings. Squishies are
        recommended for ages 3+. Small parts — supervise young children.
      </div>
    </footer>
  );
}
