export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface Story {
  id: string;
  date: string;
  neighborhood: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  socialLinks: SocialLinks;
  hearts: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  socialLinks: SocialLinks;
  joinedDate: string;
}

export interface Neighborhood {
  name: string;
  slug: string;
  accent: string;
}
