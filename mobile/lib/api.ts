/**
 * API Configuration and Utilities
 * 
 * Connects to the same backend as the web application
 */

import { Post, PostPreview, ApiResponse, PaginatedResponse } from '@/constants/types';

// API Base URL - Update this to your deployed backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://raghuanand.me';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || `HTTP Error ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

/**
 * Fetch all published posts
 */
export async function getPosts(): Promise<ApiResponse<PostPreview[]>> {
  return fetchApi<PostPreview[]>('/api/posts');
}

/**
 * Fetch a single post by slug
 */
export async function getPost(slug: string): Promise<ApiResponse<Post>> {
  return fetchApi<Post>(`/api/posts/${slug}`);
}

/**
 * Fetch recent posts (limited)
 */
export async function getRecentPosts(limit: number = 5): Promise<ApiResponse<PostPreview[]>> {
  return fetchApi<PostPreview[]>(`/api/posts?limit=${limit}`);
}

/**
 * Helper to get image URL from API
 */
export function getImageUrl(imageId: string): string {
  return `${API_BASE_URL}/api/images/${imageId}`;
}

export { API_BASE_URL };
