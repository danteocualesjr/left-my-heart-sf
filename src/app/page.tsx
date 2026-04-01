import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { mockStories } from "@/data/mockStories";

function RecentStoryPreview() {
  const featured = mockStories.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-warm-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-dark">
          Recent Stories
        </h2>
        <p className="mt-3 text-ink-light font-body">
          Real encounters. Real people. Real heartache.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {featured.map((story) => (
            <div
              key={story.id}
              className="bg-cream rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-body text-gate-red font-semibold uppercase tracking-wider">
                {story.neighborhood}
              </span>
              <p className="mt-3 text-fog font-body text-sm leading-relaxed line-clamp-4">
                {story.body.slice(0, 150)}...
              </p>
              <p className="mt-4 text-xs text-ink-light font-body">
                &mdash; {story.authorName}, {story.date}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/stories"
          className="inline-block mt-12 px-8 py-3 bg-fog-dark text-cream font-body font-semibold rounded-full hover:bg-fog transition-colors"
        >
          Read All Stories &rarr;
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Visit San Francisco",
      desc: "Fall in love with someone in the city by the bay.",
    },
    {
      num: "02",
      title: "Write Your Story",
      desc: "Share the moment that took your breath away.",
    },
    {
      num: "03",
      title: "Connect",
      desc: "Maybe they'll read it. Maybe they'll find you.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-dark">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <span className="font-display text-5xl font-bold text-gate-red/20">
                {step.num}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-fog-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-ink-light font-body text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <RecentStoryPreview />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
