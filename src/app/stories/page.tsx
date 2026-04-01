import CardStack from "@/components/CardStack";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockStories } from "@/data/mockStories";

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-warm-white pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-dark">
              Stories
            </h1>
            <p className="mt-3 text-ink-light font-body max-w-md mx-auto">
              Swipe through tales of love and longing from the streets of San
              Francisco. Swipe right to heart a story.
            </p>
          </div>

          <CardStack stories={mockStories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
