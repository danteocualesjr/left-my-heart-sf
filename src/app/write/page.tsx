import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WriteForm from "@/components/WriteForm";

export default function WritePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-warm-white pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-dark">
              Share Your Story
            </h1>
            <p className="mt-3 text-ink-light font-body max-w-lg mx-auto">
              Tell us about the person who made your heart skip a beat in San
              Francisco. Who knows &mdash; maybe they&apos;ll read it.
            </p>
          </div>

          <WriteForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
