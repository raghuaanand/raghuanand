/**
 * Custom hooks for the mobile app
 */

import { useState, useEffect, useCallback } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { getPosts, getPost, getRecentPosts } from './api';
import { PostPreview, Post } from '@/constants/types';
import { isTablet } from './utils';

/**
 * Hook to track device dimensions and orientation
 */
export function useDeviceInfo() {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
  const [tablet, setTablet] = useState(isTablet);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setTablet(window.width >= 600 && window.height / window.width < 1.6);
    });

    return () => subscription?.remove();
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    isTablet: tablet,
    isLandscape: dimensions.width > dimensions.height,
  };
}

/**
 * Hook to load custom fonts
 */
export function useAppFonts() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'CrimsonPro-Regular': require('../assets/fonts/CrimsonPro-Regular.ttf'),
    'CrimsonPro-SemiBold': require('../assets/fonts/CrimsonPro-SemiBold.ttf'),
    'CrimsonPro-Italic': require('../assets/fonts/CrimsonPro-Italic.ttf'),
    'IBMPlexMono-Regular': require('../assets/fonts/IBMPlexMono-Regular.ttf'),
  });

  return fontsLoaded;
}

/**
 * Hook to fetch all posts
 */
export function usePosts() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await getPosts();
    
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setPosts(result.data);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

/**
 * Hook to fetch a single post
 */
export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);
      
      const result = await getPost(slug);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setPost(result.data);
      }
      
      setLoading(false);
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}

/**
 * Hook to fetch recent posts
 */
export function useRecentPosts(limit: number = 5) {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      
      const result = await getRecentPosts(limit);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setPosts(result.data);
      }
      
      setLoading(false);
    }

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
}
