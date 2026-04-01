"use client";

import { useState } from "react";
import { neighborhoods } from "@/data/neighborhoods";
import StoryCard from "./StoryCard";
import type { Story } from "@/lib/types";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [body, setBody] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [showToast, setShowToast] = useState(false);

  const previewStory: Story = {
    id: "preview",
    date: date
      ? new Date(date).toLocaleDateString("en-US", {
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

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-body font-semibold text-fog-dark mb-2">
            Story Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., The Girl at Sotto Mare"
            className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-fog-dark transition-colors"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-semibold text-fog-dark mb-2">
              Date of Encounter
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-fog-dark transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-body font-semibold text-fog-dark mb-2">
              Neighborhood
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-fog-dark transition-colors"
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
          <label className="block text-sm font-body font-semibold text-fog-dark mb-2">
            Your Story
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            placeholder="Tonight I had dinner at Sotto Mare and I fell in love with one of the girls who served me my food..."
            className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-fog-dark transition-colors resize-none"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-body font-semibold text-fog-dark">
            Social Links{" "}
            <span className="text-ink-light font-normal">(optional)</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="X / Twitter URL"
              className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-sm text-fog-dark transition-colors"
            />
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram URL"
              className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-sm text-fog-dark transition-colors"
            />
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website URL"
              className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-gate-red focus:ring-2 focus:ring-gate-red/20 outline-none font-body text-sm text-fog-dark transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gate-red text-cream font-body font-semibold text-lg rounded-full hover:bg-gate-red-light transition-colors shadow-lg hover:shadow-xl"
        >
          Post Your Story
        </button>
      </form>

      {/* Live Preview */}
      <div className="hidden lg:block sticky top-24">
        <p className="text-sm font-body font-semibold text-ink-light mb-4 text-center">
          Live Preview
        </p>
        <StoryCard story={previewStory} />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-fog-dark text-cream font-body text-sm rounded-full shadow-xl animate-bounce">
          Coming soon &mdash; sign up to post your story!
        </div>
      )}
    </div>
  );
}
