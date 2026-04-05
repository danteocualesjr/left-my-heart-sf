"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/stories", label: "Stories" },
    { href: "/write", label: "Write" },
  ];

  const linkColor = (href: string) =>
    pathname === href
      ? "text-gate-red"
      : isHome
        ? "text-cream/70 hover:text-cream"
        : "text-ink-light hover:text-fog-dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        isHome && !mobileOpen
          ? "bg-transparent"
          : "bg-warm-white/90 backdrop-blur-md border-b border-cream-dark/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setMobileOpen(false)}
        >
          <HeartIcon />
          <span
            className={`font-display text-lg font-bold transition-colors ${
              isHome && !mobileOpen ? "text-cream" : "text-fog-dark"
            }`}
          >
            Left My Heart in SF
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium transition-colors ${linkColor(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 rounded transition-all ${
              mobileOpen
                ? "rotate-45 translate-y-[4px] bg-fog-dark"
                : isHome
                  ? "bg-cream"
                  : "bg-fog-dark"
            }`}
          />
          <span
            className={`block w-5 h-0.5 rounded transition-all ${
              mobileOpen
                ? "-rotate-45 -translate-y-[4px] bg-fog-dark"
                : isHome
                  ? "bg-cream"
                  : "bg-fog-dark"
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sm:hidden bg-warm-white/95 backdrop-blur-md border-t border-cream-dark/30 px-6 pb-6 pt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 font-body text-base font-medium border-b border-cream-dark/20 last:border-0 ${
                  pathname === link.href
                    ? "text-gate-red"
                    : "text-fog-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
