"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function BridgeSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 320"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Water */}
      <rect y="280" width="1440" height="40" className="fill-bay-dark/20" />

      {/* Main cable */}
      <path
        d="M0 240 Q360 60 720 180 Q1080 300 1440 120"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gate-red/30"
      />

      {/* Tower 1 */}
      <rect x="340" y="80" width="8" height="200" rx="2" className="fill-gate-red/25" />
      <rect x="360" y="80" width="8" height="200" rx="2" className="fill-gate-red/25" />
      <rect x="336" y="76" width="36" height="10" rx="2" className="fill-gate-red/25" />
      <rect x="336" y="120" width="36" height="6" rx="1" className="fill-gate-red/20" />
      <rect x="336" y="160" width="36" height="6" rx="1" className="fill-gate-red/20" />

      {/* Tower 2 */}
      <rect x="1060" y="130" width="8" height="150" rx="2" className="fill-gate-red/25" />
      <rect x="1080" y="130" width="8" height="150" rx="2" className="fill-gate-red/25" />
      <rect x="1056" y="126" width="36" height="10" rx="2" className="fill-gate-red/25" />
      <rect x="1056" y="170" width="36" height="6" rx="1" className="fill-gate-red/20" />

      {/* Vertical cables */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 380 + i * 35;
        if (x > 1050) return null;
        const cableY = 180 + Math.sin((x - 360) * 0.003) * 80;
        return (
          <line
            key={i}
            x1={x}
            y1={Math.min(cableY, 275)}
            x2={x}
            y2="275"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-gate-red/15"
          />
        );
      })}

      {/* Road deck */}
      <rect x="0" y="275" width="1440" height="4" rx="1" className="fill-gate-red/20" />
    </svg>
  );
}

function FogLayer({ delay, y, opacity }: { delay: number; y: string; opacity: number }) {
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: y }}
      animate={{ x: ["-8%", "8%", "-8%"], opacity: [opacity * 0.5, opacity, opacity * 0.5] }}
      transition={{ duration: 25, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div className="w-[120%] h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl" />
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#111822] via-fog-dark to-fog">
      {/* Fog layers */}
      <FogLayer delay={0} y="15%" opacity={0.4} />
      <FogLayer delay={6} y="40%" opacity={0.3} />
      <FogLayer delay={12} y="65%" opacity={0.5} />

      {/* City lights */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 55}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: i % 3 === 0 ? "#F39C12" : i % 3 === 1 ? "#FDF6E3" : "#E74C3C",
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Bridge at bottom */}
      <div className="absolute bottom-8 left-0 right-0 opacity-60">
        <BridgeSilhouette />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          className="text-[11px] font-body font-bold uppercase tracking-[0.3em] text-gate-red-light/60 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          A place for love stories
        </motion.p>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          I Left My Heart
          <br />
          <span className="italic text-gate-red-light">in San Francisco</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base sm:text-lg text-cream/50 font-body max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Stories of love found and lost in the city by the bay.
          Share yours. Read theirs. Feel everything.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/stories"
            className="group px-8 py-4 bg-gate-red text-cream font-body font-semibold text-base rounded-full hover:bg-gate-red-light transition-all shadow-lg hover:shadow-xl hover:shadow-gate-red/20 active:scale-95"
          >
            Read Stories
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/write"
            className="px-8 py-4 bg-cream/5 border border-cream/20 text-cream/80 font-body font-semibold text-base rounded-full hover:bg-cream/10 hover:text-cream transition-all active:scale-95"
          >
            Share Your Story
          </Link>
        </motion.div>

        <motion.p
          className="mt-20 text-cream/25 text-xs font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          &ldquo;The coldest winter I ever spent was a summer in San Francisco.&rdquo;
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-warm-white to-transparent" />
    </section>
  );
}
