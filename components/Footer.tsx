import { social } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-pink-200 bg-foreground text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-[family-name:var(--font-fredoka)] text-xl font-bold">
            SquishyBun Dumplings
          </p>
          <p className="mt-2 max-w-sm text-sm font-semibold text-white/75">
            Frontend-only demo store. Replace Stripe links and copy before you
            launch.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm font-bold">
          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            TikTok
          </a>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            Instagram
          </a>
          <a
            href={`mailto:${social.email}`}
            className="transition hover:text-primary"
          >
            {social.email}
          </a>
        </div>
        <div className="flex flex-col gap-2 text-xs font-semibold text-white/65">
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs font-semibold text-white/50">
        © {new Date().getFullYear()} SquishyBun Dumplings. All rights
        reserved.
      </div>
    </footer>
  );
}
