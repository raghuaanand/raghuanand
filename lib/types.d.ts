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
