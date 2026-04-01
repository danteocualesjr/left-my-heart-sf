"use client";

import { useState, useCallback } from "react";
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
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        return (
          <motion.div
            key={i}
            className="absolute text-gate-red"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0.8],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2, 1.5] }}
        transition={{ duration: 0.5 }}
        className="text-gate-red"
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function SwipeHint({ direction }: { direction: "left" | "right" }) {
  return (
    <motion.div
      className={`absolute top-8 ${
        direction === "right" ? "right-8" : "left-8"
      } z-10 pointer-events-none`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div
        className={`px-4 py-2 rounded-full font-body font-bold text-sm border-4 ${
          direction === "right"
            ? "border-gate-red text-gate-red rotate-12"
            : "border-bay text-bay -rotate-12"
        }`}
      >
        {direction === "right" ? "LOVE" : "NEXT"}
      </div>
    </motion.div>
  );
}

function DraggableCard({
  story,
  onSwipe,
  isTop,
}: {
  story: Story;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const opacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0.5, 1, 1, 1, 0.5]
  );

  const swipeDirection = useTransform(x, (val) => {
    if (val > 60) return "right";
    if (val < -60) return "left";
    return null;
  });

  const [hint, setHint] = useState<"left" | "right" | null>(null);

  const handleDrag = useCallback(() => {
    const dir = swipeDirection.get();
    setHint(dir as "left" | "right" | null);
  }, [swipeDirection]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 100;
      if (Math.abs(info.offset.x) > threshold) {
        onSwipe(info.offset.x > 0 ? "right" : "left");
      }
      setHint(null);
    },
    [onSwipe]
  );

  if (!isTop) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full scale-[0.95] opacity-60">
          <StoryCard story={story} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: hint === "right" ? 400 : -400, opacity: 0, rotate: hint === "right" ? 30 : -30 }}
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

  const visibleStories = stories.slice(currentIndex, currentIndex + 2);
  const isFinished = currentIndex >= stories.length;

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ height: "70vh", minHeight: 500 }}>
      {showHeartBurst && (
        <HeartBurst onComplete={() => setShowHeartBurst(false)} />
      )}

      <AnimatePresence mode="popLayout">
        {!isFinished ? (
          visibleStories.map((story, i) => (
            <DraggableCard
              key={story.id}
              story={story}
              onSwipe={handleSwipe}
              isTop={i === 0}
            />
          ))
        ) : (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gate-red/30 mx-auto"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-fog-dark">
              You&apos;ve read all the stories
            </h3>
            <p className="mt-2 text-ink-light font-body">
              Come back soon for more tales from the city by the bay.
            </p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="mt-6 px-6 py-3 bg-gate-red text-cream font-body font-semibold rounded-full hover:bg-gate-red-light transition-colors"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {!isFinished && (
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-6">
          <button
            onClick={() => handleSwipe("left")}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-bay hover:bg-bay hover:text-white transition-colors"
            title="Next story"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gate-red hover:bg-gate-red hover:text-white transition-colors"
            title="Heart this story"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      )}

      {/* Counter */}
      {!isFinished && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className="text-xs text-ink-light font-body">
            {currentIndex + 1} / {stories.length}
          </span>
        </div>
      )}
    </div>
  );
}
