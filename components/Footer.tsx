import Image from "next/image";
import { social } from "@/lib/data";

const PAYMENT_ICONS = [
  { src: "/mastercard.png", alt: "Mastercard" },
  { src: "/american-express.png", alt: "American Express" },
  { src: "/paypal.png", alt: "PayPal" },
  { src: "/visa.png", alt: "Visa" },
] as const;

const SOCIAL_ICON = "h-5 w-5 shrink-0 object-contain";
const PAYMENT_ICON = "h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8";

export function Footer() {
  return (
    <footer className="border-t border-[#e65f00] bg-[#ff8a12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
        {/*
          Mobile: row 1 = brand | social (2 cols). Row 2 = payments full width centered.
          md+: single row, 3 cols — brand | payments | social.
        */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-4 md:grid-cols-[1fr_auto_1fr] md:gap-x-4 md:gap-y-0">
          <span className="col-start-1 row-start-1 min-w-0 justify-self-start self-start pr-2 leading-tight font-[family-name:var(--font-fredoka)] text-sm font-black tracking-tight text-white sm:text-base md:pr-0">
            SquishyBun Dumplings.
          </span>

          <div className="col-span-2 row-start-2 flex flex-wrap justify-center gap-x-2 gap-y-2 px-0 sm:gap-3 md:col-span-1 md:col-start-2 md:row-start-1 md:px-1">
            {PAYMENT_ICONS.map(({ src, alt }) => (
              <Image
                key={src}
                src={src}
                alt={alt}
                width={32}
                height={32}
                className={PAYMENT_ICON}
              />
            ))}
          </div>

          <nav
            aria-label="Social"
            className="col-start-2 row-start-1 flex min-w-0 shrink-0 flex-col items-end gap-3 self-start text-[10px] font-extrabold uppercase tracking-wide sm:gap-4 sm:text-xs md:col-start-3 md:row-start-1"
          >
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white transition hover:text-[#2d2384]"
            >
              <Image
                src="/insta.png"
                alt=""
                width={20}
                height={20}
                className={SOCIAL_ICON}
              />
              <span>Instagram</span>
            </a>
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white transition hover:text-[#2d2384]"
            >
              <Image
                src="/tiktok.png"
                alt=""
                width={20}
                height={20}
                className={SOCIAL_ICON}
              />
              <span>TikTok</span>
            </a>
          </nav>
        </div>

        <p className="mt-5 border-t border-white/20 pt-4 text-center text-xs font-semibold text-white/85 sm:mt-6 sm:pt-5 sm:text-sm">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
