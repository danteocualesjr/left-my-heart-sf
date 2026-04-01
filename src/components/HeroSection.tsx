"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function GoldenGateSVG() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="w-full h-auto opacity-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main cables */}
      <path
        d="M0 300 Q300 50 600 200 Q900 350 1200 100"
        stroke="currentColor"
        strokeWidth="4"
        className="text-gate-red"
      />
      <path
        d="M0 310 Q300 60 600 210 Q900 360 1200 110"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gate-red/50"
      />
      {/* Towers */}
      <rect x="280" y="80" width="12" height="280" rx="2" className="fill-gate-red" />
      <rect x="308" y="80" width="12" height="280" rx="2" className="fill-gate-red" />
      <rect x="280" y="80" width="40" height="12" rx="2" className="fill-gate-red" />
      <rect x="280" y="140" width="40" height="8" rx="2" className="fill-gate-red" />
      <rect x="880" y="130" width="12" height="230" rx="2" className="fill-gate-red" />
      <rect x="908" y="130" width="12" height="230" rx="2" className="fill-gate-red" />
      <rect x="880" y="130" width="40" height="12" rx="2" className="fill-gate-red" />
      <rect x="880" y="190" width="40" height="8" rx="2" className="fill-gate-red" />
      {/* Vertical cables */}
      {[320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760, 800, 840].map(
        (x, i) => (
          <line
            key={i}
            x1={x}
            y1={200 + Math.sin((x - 300) * 0.005) * 100}
            x2={x}
            y2="360"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gate-red/30"
          />
        )
      )}
      {/* Road deck */}
      <rect x="0" y="355" width="1200" height="6" rx="1" className="fill-gate-red/40" />
    </svg>
  );
}

function FogLayer({ delay, y }: { delay: number; y: string }) {
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: y }}
      animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 20, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div className="w-[120%] h-24 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-3xl" />
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-fog-dark via-fog to-fog-light">
      {/* Fog animations */}
      <FogLayer delay={0} y="20%" />
      <FogLayer delay={5} y="50%" />
      <FogLayer delay={10} y="75%" />

      {/* Bridge illustration */}
      <div className="absolute bottom-0 left-0 right-0 px-4">
        <GoldenGateSVG />
      </div>

      {/* Stars / city lights */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sunset-light"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight tracking-tight">
            I Left My Heart
            <br />
            <span className="text-gate-red-light">in San Francisco</span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-cream/70 font-body max-w-xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Stories of love found and lost in the city by the bay.
          <br className="hidden sm:block" />
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
            className="px-8 py-4 bg-gate-red text-cream font-body font-semibold text-lg rounded-full hover:bg-gate-red-light transition-colors shadow-lg hover:shadow-xl"
          >
            Read Stories
          </Link>
          <Link
            href="/write"
            className="px-8 py-4 bg-transparent border-2 border-cream/40 text-cream font-body font-semibold text-lg rounded-full hover:bg-cream/10 transition-colors"
          >
            Share Your Story
          </Link>
        </motion.div>

        <motion.p
          className="mt-16 text-cream/40 text-sm font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          &ldquo;The coldest winter I ever spent was a summer in San
          Francisco.&rdquo;
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-white to-transparent" />
    </section>
  );
}
