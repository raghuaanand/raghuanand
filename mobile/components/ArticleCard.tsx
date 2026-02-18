/**
 * Article Card Component
 * 
 * Clean, Medium-inspired article preview card
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Text, Caption } from '@/components/ui';
import { colors, spacing, layout } from '@/constants/theme';
import { PostPreview } from '@/constants/types';
import { formatDate, getReadingTime, generateExcerpt, stripHtml } from '@/lib/utils';

interface ArticleCardProps {
  article: PostPreview;
  variant?: 'default' | 'compact' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/writing/${article.slug}`);
  };

  const displayDate = article.publishedAt || article.createdAt;
  const excerpt = article.description || 
    (article.excerpt ? stripHtml(article.excerpt) : '');

  if (variant === 'compact') {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.compactCard,
          pressed && styles.pressed,
        ]}
      >
        <Text variant="label" numberOfLines={2} style={styles.compactTitle}>
          {article.title}
        </Text>
        <Caption>{formatDate(displayDate)}</Caption>
      </Pressable>
    );
  }

  if (variant === 'featured') {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.featuredCard,
          pressed && styles.pressed,
        ]}
      >
        <Caption style={styles.date}>{formatDate(displayDate)}</Caption>
        <Text variant="h4" numberOfLines={3} style={styles.featuredTitle}>
          {article.title}
        </Text>
        {excerpt && (
          <Text variant="body" color={600} numberOfLines={2} style={styles.excerpt}>
            {excerpt}
          </Text>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.meta}>
        <Caption>{formatDate(displayDate)}</Caption>
      </View>
      
      <Text variant="h5" numberOfLines={2} style={styles.title}>
        {article.title}
      </Text>
      
      {excerpt && (
        <Text variant="bodySmall" color={600} numberOfLines={2} style={styles.excerpt}>
          {excerpt}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  date: {
    marginBottom: spacing[2],
  },
  title: {
    marginBottom: spacing[1],
  },
  excerpt: {
    marginTop: spacing[1],
  },
  
  // Compact variant
  compactCard: {
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  compactTitle: {
    marginBottom: spacing[1],
  },
  
  // Featured variant
  featuredCard: {
    padding: spacing[5],
    backgroundColor: colors.ink[100],
    borderRadius: layout.borderRadius.lg,
    marginBottom: spacing[4],
  },
  featuredTitle: {
    marginBottom: spacing[2],
  },
});
