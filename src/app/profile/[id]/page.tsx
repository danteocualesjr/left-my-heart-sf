import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import SocialLinks from "@/components/SocialLinks";
import { mockUsers } from "@/data/mockUsers";
import { mockStories } from "@/data/mockStories";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  const userStories = mockStories.filter((s) => s.authorId === id);
  const totalHearts = userStories.reduce((sum, s) => sum + s.hearts, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-fog-dark via-fog to-warm-white" style={{ height: "340px" }} />

        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* Profile Header */}
            <div className="text-center mb-14">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gate-red to-sunset mx-auto flex items-center justify-center shadow-xl shadow-gate-red/20 border-4 border-white">
                <span className="text-cream font-display text-3xl font-bold">
                  {user.displayName.charAt(0)}
                </span>
              </div>

              <h1 className="mt-5 font-display text-3xl sm:text-4xl font-bold text-fog-dark">
                {user.displayName}
              </h1>

              <p className="mt-2 text-ink-light/60 font-body max-w-md mx-auto text-sm leading-relaxed">
                {user.bio}
              </p>

              <div className="mt-5 flex justify-center">
                <SocialLinks links={user.socialLinks} />
              </div>

              {/* Mini stats */}
              <div className="mt-6 inline-flex items-center gap-6 px-6 py-3 bg-white rounded-full shadow-sm border border-cream-dark/30">
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-fog-dark">{userStories.length}</span>
                  <span className="text-[10px] text-ink-light/50 font-body uppercase tracking-wider ml-1.5">
                    {userStories.length === 1 ? "story" : "stories"}
                  </span>
                </div>
                <div className="w-px h-5 bg-cream-dark/40" />
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-gate-red">{totalHearts}</span>
                  <span className="text-[10px] text-ink-light/50 font-body uppercase tracking-wider ml-1.5">hearts</span>
                </div>
                <div className="w-px h-5 bg-cream-dark/40" />
                <div className="text-center">
                  <span className="text-[10px] text-ink-light/50 font-body">
                    Since{" "}
                    {new Date(user.joinedDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Stories */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="font-display text-2xl font-bold text-fog-dark">
                  Stories
                </h2>
                <div className="h-px flex-1 bg-cream-dark/40" />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {userStories.map((story) => (
                  <StoryCard key={story.id} story={story} compact />
                ))}
              </div>

              {userStories.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-light/30">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <p className="text-ink-light/50 font-body text-sm">
                    No stories yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
