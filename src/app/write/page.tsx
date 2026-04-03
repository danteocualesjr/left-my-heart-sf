import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WriteForm from "@/components/WriteForm";

export default function WritePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 to-warm-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gate-red/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-bay/[0.03] rounded-full blur-3xl" />

        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-gate-red/50 mb-3">
                Tell your story
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-dark leading-tight">
                Share Your
                <span className="italic text-gate-red"> Story</span>
              </h1>
              <p className="mt-4 text-ink-light/60 font-body text-sm max-w-md mx-auto leading-relaxed">
                Tell us about the person who made your heart skip a beat in San
                Francisco. Who knows &mdash; maybe they&apos;ll read it.
              </p>
            </div>

            <WriteForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
