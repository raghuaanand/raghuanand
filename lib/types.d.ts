export type FeaturedProject = {
  title: string;
  description: string;
  highlights?: string[];
  image?: string;
  github: string;
  live?: string;
  stack?: string[];
};

export type FeaturedProjects = FeaturedProject[];

export interface MediumPost {
  title: string;
  slug: string;
  pubDate: string;
  coverImage: string | null;
  description: string;
  categories: string[];
  readingTime: string;
  mediumUrl: string;
  content: string;
  author: string;
}
