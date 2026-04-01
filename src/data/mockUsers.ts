import { UserProfile } from "@/lib/types";

export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    displayName: "Marco V.",
    bio: "Traveler, writer, hopeless romantic. Visited SF once and never got over it.",
    socialLinks: {
      twitter: "https://twitter.com/marcov",
      instagram: "https://instagram.com/marcov",
      website: "https://marcov.blog",
    },
    joinedDate: "2026-01-15",
  },
  {
    id: "user-2",
    displayName: "Elise K.",
    bio: "NYC native who fell for someone at a coffee shop overlooking the bay.",
    socialLinks: {
      instagram: "https://instagram.com/elisek",
    },
    joinedDate: "2026-02-03",
  },
  {
    id: "user-3",
    displayName: "James T.",
    bio: "Software engineer turned poet. San Francisco changed me forever.",
    socialLinks: {
      twitter: "https://twitter.com/jamest_writes",
      website: "https://jamest.dev",
    },
    joinedDate: "2026-02-20",
  },
  {
    id: "user-4",
    displayName: "Ava S.",
    bio: "From London with love. Spent a summer in SF and left a piece of myself behind.",
    socialLinks: {
      instagram: "https://instagram.com/ava.s.london",
      twitter: "https://twitter.com/ava_s_london",
    },
    joinedDate: "2026-03-01",
  },
];
