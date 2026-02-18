/**
 * Article Detail Screen
 * 
 * Medium-quality reading experience for blog posts
 */

import React from 'react';
import { ScrollView, View, Share, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Text,
  Loading,
  Divider,
  ReadingContainer,
} from '@/components/ui';
import { ArticleHeader } from '@/components/Header';
import { ArticleContent } from '@/components/ArticleContent';
import { colors, spacing, layout } from '@/constants/theme';
import { usePost, useDeviceInfo } from '@/lib/hooks';
import { formatDate, getReadingTime } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/api';

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const { post, loading, error } = usePost(slug || '');
  const { isTablet } = useDeviceInfo();

  const handleShare = async () => {
    if (!post) return;
    
    try {
      await Share.share({
        title: post.title,
        message: `${post.title} - ${API_BASE_URL}/blogs/${post.slug}`,
        url: `${API_BASE_URL}/blogs/${post.slug}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ArticleHeader />
        <Loading fullScreen message="Loading article..." />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ArticleHeader />
        <View style={styles.errorContainer}>
          <Text variant="h4" align="center">
            Article not found
          </Text>
          <Text variant="body" color={500} align="center" style={styles.errorText}>
            {error || "This article doesn't exist or has been removed."}
          </Text>
        </View>
      </View>
    );
  }

  const displayDate = post.publishedAt || post.createdAt;
  const readingTime = getReadingTime(post.content);

  return (
    <View style={styles.container}>
      {/* Header */}
      <ArticleHeader onShare={handleShare} />

      {/* Article Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing[8] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ReadingContainer>
          {/* Article Header */}
          <View style={styles.articleHeader}>
            <Text variant="h1" style={styles.title}>
              {post.title}
            </Text>
            
            <View style={styles.meta}>
              <Text variant="bodySmall" color={500}>
                {formatDate(displayDate)}
              </Text>
              <Text variant="bodySmall" color={400}>
                •
              </Text>
              <Text variant="bodySmall" color={500}>
                {readingTime}
              </Text>
            </View>
          </View>

          <Divider spacing="lg" />

          {/* Article Body */}
          <View style={styles.articleBody}>
            <ArticleContent
              content={post.content}
              contentType={post.contentType}
            />
          </View>

          <Divider spacing="xl" />

          {/* Article Footer */}
          <View style={styles.articleFooter}>
            <Text variant="bodySmall" color={500} align="center">
              Thanks for reading.
            </Text>
          </View>
        </ReadingContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: spacing[4],
  },
  
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  errorText: {
    marginTop: spacing[2],
  },

  // Article header
  articleHeader: {
    marginBottom: spacing[4],
  },
  title: {
    marginBottom: spacing[4],
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  // Article body
  articleBody: {
    // Styles handled by ArticleContent
  },

  // Article footer
  articleFooter: {
    paddingVertical: spacing[6],
  },
});
