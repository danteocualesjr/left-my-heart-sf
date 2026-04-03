"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { Story } from "@/lib/types";
import StoryCard from "./StoryCard";

interface CardStackProps {
  stories: Story[];
}

function HeartBurst({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 60 + Math.random() * 60;
        return (
          <motion.div
            key={i}
            className="absolute text-gate-red"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.2, 0.6],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.8, 1.2] }}
        transition={{ duration: 0.4 }}
        className="text-gate-red"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function SwipeHint({ direction }: { direction: "left" | "right" }) {
  return (
    <motion.div
      className={`absolute top-6 ${
        direction === "right" ? "right-6" : "left-6"
      } z-10 pointer-events-none`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div
        className={`px-5 py-2 rounded-lg font-body font-black text-sm tracking-wider border-[3px] backdrop-blur-sm ${
          direction === "right"
            ? "border-gate-red text-gate-red bg-gate-red/10 rotate-12"
            : "border-bay text-bay bg-bay/10 -rotate-12"
        }`}
      >
        {direction === "right" ? "LOVE" : "NEXT"}
      </div>
    </motion.div>
  );
}

function TopCard({
  story,
  onSwipe,
}: {
  story: Story;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const cardOpacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0.5, 1, 1, 1, 0.5]
  );

  const swipeDirection = useTransform(x, (val) => {
    if (val > 50) return "right";
    if (val < -50) return "left";
    return null;
  });

  const [hint, setHint] = useState<"left" | "right" | null>(null);
  const [exitDir, setExitDir] = useState<"left" | "right">("left");

  const handleDrag = useCallback(() => {
    const dir = swipeDirection.get();
    setHint(dir as "left" | "right" | null);
  }, [swipeDirection]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 80;
      if (Math.abs(info.offset.x) > threshold) {
        const dir = info.offset.x > 0 ? "right" : "left";
        setExitDir(dir);
        onSwipe(dir);
      }
      setHint(null);
    },
    [onSwipe]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity: cardOpacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.96, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: exitDir === "right" ? 500 : -500,
        opacity: 0,
        rotate: exitDir === "right" ? 25 : -25,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <AnimatePresence>
        {hint && <SwipeHint direction={hint} />}
      </AnimatePresence>
      <div className="w-full">
        <StoryCard story={story} />
      </div>
    </motion.div>
  );
}

export default function CardStack({ stories }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "right") {
        setShowHeartBurst(true);
      }
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, direction === "right" ? 300 : 100);
    },
    []
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (currentIndex >= stories.length) return;
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, stories.length, handleSwipe]);

  const topStory = stories[currentIndex];
  const nextStory = stories[currentIndex + 1];
  const isFinished = currentIndex >= stories.length;

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ height: "72vh", minHeight: 520 }}>
      {showHeartBurst && (
        <HeartBurst onComplete={() => setShowHeartBurst(false)} />
      )}

      {/* Back card peek */}
      {nextStory && !isFinished && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-full scale-[0.94] opacity-30 translate-y-3 blur-[0.5px]">
            <StoryCard story={nextStory} />
          </div>
        </div>
      )}

      {/* Top card */}
      <AnimatePresence mode="wait">
        {topStory && !isFinished && (
          <TopCard key={topStory.id} story={topStory} onSwipe={handleSwipe} />
        )}
      </AnimatePresence>

      {/* Empty state */}
      {isFinished && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-gate-red/10 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-gate-red/40">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-fog-dark">
            You&apos;ve read all the stories
          </h3>
          <p className="mt-2 text-ink-light font-body text-sm max-w-xs">
            Come back soon for more tales from the city by the bay.
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="mt-8 px-8 py-3 bg-gate-red text-cream font-body font-semibold rounded-full hover:bg-gate-red-light transition-all hover:shadow-lg active:scale-95"
          >
            Start Over
          </button>
        </motion.div>
      )}

      {/* Action buttons */}
      {!isFinished && (
        <div className="absolute -bottom-20 left-0 right-0 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSwipe("left")}
              className="group w-14 h-14 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-ink-light/40 hover:text-bay hover:border-bay border-2 border-transparent transition-all active:scale-90"
              title="Skip (←)"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={() => handleSwipe("right")}
              className="group w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gate-red/60 hover:text-gate-red hover:border-gate-red border-2 border-transparent transition-all active:scale-90"
              title="Heart (→)"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-ink-light/40 font-body">
            <span>{currentIndex + 1} of {stories.length}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">← → arrow keys</span>
          </div>
        </div>
      )}
    </div>
  );
}
