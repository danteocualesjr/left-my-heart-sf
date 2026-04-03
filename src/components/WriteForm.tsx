"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { neighborhoods } from "@/data/neighborhoods";
import StoryCard from "./StoryCard";
import type { Story } from "@/lib/types";

const MAX_CHARS = 2000;

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [body, setBody] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [showToast, setShowToast] = useState(false);

  const charCount = body.length;
  const charPercent = Math.min((charCount / MAX_CHARS) * 100, 100);

  const previewStory: Story = {
    id: "preview",
    date: date
      ? new Date(date + "T12:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Your date here",
    neighborhood: neighborhood || "North Beach",
    title: title || "Your Story Title",
    body:
      body ||
      "Start writing your story here... Tell us about the person you met, the moment that took your breath away, and why you left your heart in San Francisco.",
    authorId: "preview",
    authorName: "You",
    socialLinks: {
      twitter: twitter || undefined,
      instagram: instagram || undefined,
      website: website || undefined,
    },
    hearts: 0,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white border border-cream-dark/60 focus:border-gate-red focus:ring-2 focus:ring-gate-red/10 outline-none font-body text-fog-dark transition-all placeholder:text-ink-light/30";

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-cream-dark/40 p-6 sm:p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-body font-bold uppercase tracking-wider text-ink-light/60 mb-2">
              Story Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Girl at Sotto Mare"
              className={inputClasses}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-bold uppercase tracking-wider text-ink-light/60 mb-2">
                Date of Encounter
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-xs font-body font-bold uppercase tracking-wider text-ink-light/60 mb-2">
                Neighborhood
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select a neighborhood</option>
                {neighborhoods.map((n) => (
                  <option key={n.slug} value={n.name}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-body font-bold uppercase tracking-wider text-ink-light/60">
                Your Story
              </label>
              <span
                className={`text-[11px] font-body tabular-nums ${
                  charCount > MAX_CHARS ? "text-gate-red font-bold" : "text-ink-light/40"
                }`}
              >
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Tonight I had dinner at Sotto Mare and I fell in love with one of the girls who served me my food..."
              className={`${inputClasses} resize-none`}
            />
            <div className="mt-1.5 h-1 bg-cream-dark/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${charPercent}%`,
                  backgroundColor: charPercent > 90 ? "#C0392B" : charPercent > 70 ? "#E67E22" : "#2980B9",
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-cream-dark/40 p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-body font-bold uppercase tracking-wider text-ink-light/60 mb-4">
            Social Links
            <span className="font-normal normal-case tracking-normal ml-2 text-ink-light/30">optional</span>
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink-light/40">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/you"
                className={`${inputClasses} text-sm`}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink-light/40">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/you"
                className={`${inputClasses} text-sm`}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-light/40">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className={`${inputClasses} text-sm`}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gate-red text-cream font-body font-semibold text-base rounded-full hover:bg-gate-red-light transition-all shadow-lg hover:shadow-xl hover:shadow-gate-red/20 active:scale-[0.98]"
        >
          Post Your Story
        </button>
      </form>

      {/* Live Preview */}
      <div className="hidden lg:block sticky top-24">
        <p className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-ink-light/40 mb-5 text-center">
          Live Preview
        </p>
        <div className="animate-float">
          <StoryCard story={previewStory} />
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-50 px-6 py-3 bg-fog-dark text-cream font-body text-sm rounded-full shadow-xl"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
          >
            Coming soon &mdash; sign up to post your story!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
