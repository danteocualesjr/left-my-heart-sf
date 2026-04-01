"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HeartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gate-red"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { href: "/stories", label: "Stories" },
    { href: "/write", label: "Write" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        isHome
          ? "bg-transparent"
          : "bg-warm-white/90 backdrop-blur-md border-b border-cream-dark"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <HeartIcon />
          <span
            className={`font-display text-lg font-bold transition-colors ${
              isHome
                ? "text-cream"
                : "text-fog-dark"
            }`}
          >
            Left My Heart in SF
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-gate-red"
                  : isHome
                    ? "text-cream/70 hover:text-cream"
                    : "text-ink-light hover:text-fog-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
