/**
 * Writing Screen
 * 
 * All articles/blog posts list - Medium-inspired design
 */

import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import { ArticleList } from '@/components/ArticleList';
import { colors, spacing, layout } from '@/constants/theme';
import { usePosts, useDeviceInfo } from '@/lib/hooks';

export default function WritingScreen() {
  const insets = useSafeAreaInsets();
  const { posts, loading, error, refetch } = usePosts();
  const { isTablet } = useDeviceInfo();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing[4] }]}>
        <View style={[styles.headerContent, isTablet && styles.headerTablet]}>
          <Text variant="h2">Writing</Text>
          <Text variant="body" color={600} style={styles.subtitle}>
            Thoughts on engineering, system design, and building products.
          </Text>
        </View>
      </View>

      {/* Error state */}
      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text variant="body" color="error" align="center">
            {error}
          </Text>
        </View>
      )}

      {/* Article List */}
      <View style={[styles.listContainer, isTablet && styles.listTablet]}>
        <ArticleList
          articles={posts}
          loading={loading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showFeatured={true}
          emptyMessage="No articles published yet. Check back soon!"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: layout.screenPadding.horizontal,
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    // Default phone styles
  },
  headerTablet: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
  },
  subtitle: {
    marginTop: spacing[2],
  },
  listContainer: {
    flex: 1,
  },
  listTablet: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
  },
  errorContainer: {
    padding: spacing[6],
  },
});
