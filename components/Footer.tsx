import { social } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[#181f9c] bg-[#1f26c8] text-white">
      <div className="mx-auto flex min-h-[5.5rem] max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:min-h-[6.5rem] sm:px-6 sm:py-8">
        <div className="flex items-center">
          <span className="font-[family-name:var(--font-fredoka)] text-sm font-black tracking-tight text-white sm:text-base">
            SquishyBun Dumplings.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-wide sm:text-xs">
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-200">
            Instagram
          </a>
          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-pink-200">
            TikTok
          </a>
          <span className="text-white/70">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
