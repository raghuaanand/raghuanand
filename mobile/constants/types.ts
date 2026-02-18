/**
 * Shared Types - Mirrors web data models
 * 
 * These types match the Prisma schema from the web application
 * to ensure data compatibility across platforms.
 */

// Post/Article types (matches Prisma Post model)
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentType: 'html' | 'json';
  description?: string | null;
  excerpt?: string | null;
  published: boolean;
  publishedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// Simplified post for list views
export interface PostPreview {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

// Author info
export interface Author {
  id: string;
  name: string;
  image?: string;
}

// Project types (matches web constants)
export interface Project {
  title: string;
  description: string;
  highlights: string[];
  github?: string;
  live?: string;
  image?: string;
  stack: string[];
}

// Experience types
export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

// Social link types
export interface SocialLink {
  href: string;
  iconName: string;
  label: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
