import CardStack from "@/components/CardStack";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockStories } from "@/data/mockStories";

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative min-h-screen">
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/40 to-warm-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #2C3E50 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        {/* Decorative fog shapes */}
        <div className="absolute top-32 left-0 w-96 h-96 bg-bay/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-0 w-80 h-80 bg-gate-red/5 rounded-full blur-3xl" />

        <div className="relative z-10 pt-28 pb-40">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-gate-red/60 mb-3">
                {mockStories.length} stories and counting
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-fog-dark leading-tight">
                Stories from
                <br />
                <span className="text-gate-red italic">the city by the bay</span>
              </h1>
              <p className="mt-4 text-ink-light/70 font-body max-w-sm mx-auto text-sm leading-relaxed">
                Swipe through tales of love and longing.
                Drag right to heart a story. Drag left to move on.
              </p>
            </div>

            <CardStack stories={mockStories} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
