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

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-warm-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gate-red to-sunset mx-auto flex items-center justify-center">
              <span className="text-cream font-display text-2xl font-bold">
                {user.displayName.charAt(0)}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-fog-dark">
              {user.displayName}
            </h1>

            <p className="mt-2 text-ink-light font-body max-w-md mx-auto">
              {user.bio}
            </p>

            <div className="mt-4 flex justify-center">
              <SocialLinks links={user.socialLinks} />
            </div>

            <p className="mt-3 text-xs text-ink-light/60 font-body">
              Member since{" "}
              {new Date(user.joinedDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Stories */}
          <div>
            <h2 className="font-display text-2xl font-bold text-fog-dark mb-6">
              {userStories.length === 1 ? "1 Story" : `${userStories.length} Stories`}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2">
              {userStories.map((story) => (
                <StoryCard key={story.id} story={story} compact />
              ))}
            </div>

            {userStories.length === 0 && (
              <p className="text-center text-ink-light font-body py-12">
                No stories yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
