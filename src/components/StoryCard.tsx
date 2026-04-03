"use client";

import { Story } from "@/lib/types";
import NeighborhoodBadge from "./NeighborhoodBadge";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

interface StoryCardProps {
  story: Story;
  compact?: boolean;
}

export default function StoryCard({ story, compact = false }: StoryCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-b from-parchment to-cream rounded-2xl overflow-hidden flex flex-col border border-cream-dark/60 ${
        compact ? "max-w-sm shadow-md" : "w-full max-w-md shadow-xl"
      }`}
    >
      {/* Top accent — thin gradient line */}
      <div className="h-1 bg-gradient-to-r from-gate-red via-sunset to-bay" />

      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "px-7 py-6 sm:px-8 sm:py-7"}`}>
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <NeighborhoodBadge name={story.neighborhood} />
          <time className="text-[11px] text-ink-light/70 font-body tracking-wide uppercase">
            {story.date}
          </time>
        </div>

        {/* Title */}
        <h3
          className={`font-display font-bold text-fog-dark mt-4 leading-snug ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {story.title}
        </h3>

        {/* Decorative rule */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-gate-red/30 to-transparent" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gate-red/25 shrink-0">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-gate-red/30 to-transparent" />
        </div>

        {/* Story body */}
        <div
          className={`mt-3 font-display italic text-fog leading-[1.85] flex-1 overflow-y-auto story-scroll ${
            compact
              ? "text-[13px] max-h-36 line-clamp-5 not-italic font-body"
              : "text-[15px] sm:text-base max-h-[340px]"
          }`}
        >
          {!compact && (
            <span className="text-gate-red/20 text-4xl font-display leading-none float-left mr-1.5 -mt-1">
              &ldquo;
            </span>
          )}
          {story.body.split("\n").map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-cream-dark/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fog to-fog-light flex items-center justify-center shrink-0">
                <span className="text-cream text-xs font-body font-bold">
                  {story.authorName.charAt(0)}
                </span>
              </div>
              <div>
                <Link
                  href={`/profile/${story.authorId}`}
                  className="font-body text-sm font-semibold text-fog-dark hover:text-gate-red transition-colors"
                >
                  {story.authorName}
                </Link>
                <div className="flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gate-red"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-[11px] text-ink-light/70 font-body">
                    {story.hearts}
                  </span>
                </div>
              </div>
            </div>
            <SocialLinks links={story.socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
