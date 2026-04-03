import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { mockStories } from "@/data/mockStories";
import { mockUsers } from "@/data/mockUsers";

function Stats() {
  const totalHearts = mockStories.reduce((sum, s) => sum + s.hearts, 0);
  const neighborhoods = new Set(mockStories.map((s) => s.neighborhood)).size;

  const stats = [
    { value: mockStories.length, label: "Stories" },
    { value: mockUsers.length, label: "Writers" },
    { value: neighborhoods, label: "Neighborhoods" },
    {
      value: `${(totalHearts / 1000).toFixed(1)}k`,
      label: "Hearts",
    },
  ];

  return (
    <section className="relative -mt-8 z-20 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-cream-dark/30 p-6 sm:p-8">
        <div className="grid grid-cols-4 divide-x divide-cream-dark/40">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-2">
              <p className="font-display text-2xl sm:text-3xl font-bold text-fog-dark">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs font-body text-ink-light/60 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentStoryPreview() {
  const featured = mockStories.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-gate-red/50 mb-3">
            From the community
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-dark">
            Recent Stories
          </h2>
          <p className="mt-3 text-ink-light/60 font-body text-sm">
            Real encounters. Real people. Real heartache.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {featured.map((story, i) => (
            <Link
              key={story.id}
              href="/stories"
              className="group relative bg-gradient-to-b from-parchment to-cream rounded-2xl p-6 text-left border border-cream-dark/40 hover:border-gate-red/30 transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] font-body font-bold uppercase tracking-widest"
                  style={{ color: story.neighborhood === "North Beach" ? "#C0392B" : story.neighborhood === "The Mission" ? "#E67E22" : "#2980B9" }}
                >
                  {story.neighborhood}
                </span>
                <span className="text-[10px] text-ink-light/40 font-body">{story.date}</span>
              </div>

              <h3 className="font-display text-lg font-bold text-fog-dark group-hover:text-gate-red transition-colors">
                {story.title}
              </h3>

              <p className="mt-3 text-fog/70 font-body text-sm leading-relaxed line-clamp-3">
                {story.body.slice(0, 160)}...
              </p>

              <div className="mt-5 pt-4 border-t border-cream-dark/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fog to-fog-light flex items-center justify-center">
                    <span className="text-[9px] text-cream font-bold">{story.authorName.charAt(0)}</span>
                  </div>
                  <span className="text-xs text-ink-light/70 font-body">{story.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-gate-red/50">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-[11px] text-ink-light/50 font-body">{story.hearts}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/stories"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-fog-dark text-cream font-body font-semibold text-sm rounded-full hover:bg-fog transition-all hover:shadow-lg active:scale-95"
          >
            Read All Stories
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Visit San Francisco",
      desc: "Fall in love with someone in the city by the bay. It happens to the best of us.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gate-red/40">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Write Your Story",
      desc: "Share the moment that took your breath away. The messy, the beautiful, the real.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gate-red/40">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Connect",
      desc: "Maybe they'll read it. Maybe they'll find you. Stranger things have happened in SF.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gate-red/40">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-gate-red/50 mb-3">
            Simple as that
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-dark">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-cream-dark/30 flex items-center justify-center mx-auto">
                {step.icon}
              </div>
              <span className="block mt-4 text-[10px] font-body font-bold uppercase tracking-widest text-gate-red/30">
                Step {step.num}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-fog-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-ink-light/60 font-body text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-24 px-6 bg-fog-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #FDF6E3 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream leading-tight">
          Got a story of your own?
        </h2>
        <p className="mt-4 text-cream/40 font-body text-sm leading-relaxed max-w-md mx-auto">
          Everyone who&apos;s been to San Francisco has left a piece of themselves behind. Write yours down before it fades.
        </p>
        <Link
          href="/write"
          className="inline-block mt-8 px-8 py-4 bg-gate-red text-cream font-body font-semibold rounded-full hover:bg-gate-red-light transition-all hover:shadow-xl hover:shadow-gate-red/20 active:scale-95"
        >
          Share Your Story
        </Link>
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
        <Stats />
        <RecentStoryPreview />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
