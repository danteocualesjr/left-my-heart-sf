import Link from "next/link";

function MiniBridge() {
  return (
    <svg viewBox="0 0 400 60" className="w-48 h-auto opacity-20" fill="none">
      <path d="M0 45 Q100 10 200 35 Q300 55 400 20" stroke="currentColor" strokeWidth="2" className="text-cream" />
      <rect x="90" y="15" width="4" height="40" rx="1" className="fill-cream/30" />
      <rect x="106" y="15" width="4" height="40" rx="1" className="fill-cream/30" />
      <rect x="290" y="25" width="4" height="30" rx="1" className="fill-cream/30" />
      <rect x="306" y="25" width="4" height="30" rx="1" className="fill-cream/30" />
      <rect x="0" y="52" width="400" height="2" rx="1" className="fill-cream/20" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-fog-dark text-cream/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #FDF6E3 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gate-red/60">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="font-display text-base font-bold text-cream/80">
                Left My Heart in SF
              </span>
            </div>
            <p className="mt-2 text-xs font-body leading-relaxed max-w-xs">
              Stories of love found and lost in the city by the bay. A place for the ones who came, fell, and left a piece of themselves behind.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <MiniBridge />
            <div className="flex gap-6 text-xs font-body">
              <Link href="/stories" className="hover:text-cream transition-colors">
                Stories
              </Link>
              <Link href="/write" className="hover:text-cream transition-colors">
                Write
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-body text-cream/30">
            &copy; {new Date().getFullYear()} Left My Heart in SF
          </p>
          <p className="text-[11px] font-body text-cream/20 italic">
            Made with love, somewhere far from San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
}
