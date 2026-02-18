/**
 * Article List Component
 * 
 * Virtualized list of articles for the Writing screen
 */

import React from 'react';
import { FlatList, View, StyleSheet, ListRenderItem } from 'react-native';
import { ArticleCard } from './ArticleCard';
import { Loading, ArticleSkeleton, Text } from '@/components/ui';
import { PostPreview } from '@/constants/types';
import { colors, spacing, layout } from '@/constants/theme';

interface ArticleListProps {
  articles: PostPreview[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyMessage?: string;
  showFeatured?: boolean;
}

export function ArticleList({
  articles,
  loading = false,
  refreshing = false,
  onRefresh,
  emptyMessage = 'No articles yet',
  showFeatured = false,
}: ArticleListProps) {
  if (loading && articles.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
      </View>
    );
  }

  const renderItem: ListRenderItem<PostPreview> = ({ item, index }) => {
    // Show first item as featured if enabled
    if (showFeatured && index === 0) {
      return <ArticleCard article={item} variant="featured" />;
    }
    return <ArticleCard article={item} />;
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="body" color={500} align="center">
        {emptyMessage}
      </Text>
    </View>
  );

  const keyExtractor = (item: PostPreview) => item.id;

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={10}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding.horizontal,
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  emptyContainer: {
    flex: 1,
    padding: spacing[8],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
