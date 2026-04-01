import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-fog-dark text-cream/60 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-bold text-cream">
              Left My Heart in SF
            </p>
            <p className="mt-1 text-sm font-body">
              Stories of love found and lost in the city by the bay.
            </p>
          </div>

          <div className="flex gap-6 text-sm font-body">
            <Link href="/stories" className="hover:text-cream transition-colors">
              Stories
            </Link>
            <Link href="/write" className="hover:text-cream transition-colors">
              Write
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cream/10 text-center text-xs font-body">
          <p>&copy; {new Date().getFullYear()} Left My Heart in SF. Made with love.</p>
        </div>
      </div>
    </footer>
  );
}
