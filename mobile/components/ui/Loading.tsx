/**
 * Loading Component
 * 
 * Minimal loading states
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { Text } from './Text';

interface LoadingProps {
  style?: ViewStyle;
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export function Loading({
  style,
  size = 'large',
  message,
  fullScreen = false,
}: LoadingProps) {
  return (
    <View style={[styles.base, fullScreen && styles.fullScreen, style]}>
      <ActivityIndicator size={size} color={colors.ink[400]} />
      {message && (
        <Text variant="bodySmall" color={500} style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
}

/**
 * Skeleton loader for content
 */
export function Skeleton({
  width = '100%',
  height = 20,
  style,
}: {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        styles.skeleton,
        { width, height },
        style,
      ]}
    />
  );
}

/**
 * Article skeleton for loading states
 */
export function ArticleSkeleton() {
  return (
    <View style={styles.articleSkeleton}>
      <Skeleton height={14} width="30%" style={styles.skeletonItem} />
      <Skeleton height={24} width="90%" style={styles.skeletonItem} />
      <Skeleton height={16} width="70%" style={styles.skeletonItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  message: {
    marginTop: spacing[4],
  },
  skeleton: {
    backgroundColor: colors.ink[100],
    borderRadius: 4,
  },
  skeletonItem: {
    marginBottom: spacing[2],
  },
  articleSkeleton: {
    padding: spacing[4],
  },
});
