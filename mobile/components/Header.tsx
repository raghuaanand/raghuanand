/**
 * Header Component
 * 
 * Simple, clean header for screens
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui';
import { colors, spacing, layout } from '@/constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = false,
  rightElement,
  transparent = false,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing[2] },
        transparent && styles.transparent,
      ]}
    >
      <View style={styles.content}>
        {/* Left - Back button or spacer */}
        <View style={styles.left}>
          {showBack && (
            <Pressable
              onPress={handleBack}
              style={styles.backButton}
              hitSlop={12}
            >
              <Ionicons name="arrow-back" size={24} color={colors.ink[900]} />
            </Pressable>
          )}
        </View>

        {/* Center - Title */}
        {title && (
          <View style={styles.center}>
            <Text variant="label" numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}

        {/* Right - Custom element or spacer */}
        <View style={styles.right}>
          {rightElement}
        </View>
      </View>
    </View>
  );
}

/**
 * Article-specific header with minimal design
 */
export function ArticleHeader({ onShare }: { onShare?: () => void }) {
  const insets = useSafeAreaInsets();

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onShare?.();
  };

  return (
    <View style={[styles.articleHeader, { paddingTop: insets.top }]}>
      <Pressable onPress={handleBack} style={styles.iconButton} hitSlop={12}>
        <Ionicons name="arrow-back" size={24} color={colors.ink[900]} />
      </Pressable>

      {onShare && (
        <Pressable onPress={handleShare} style={styles.iconButton} hitSlop={12}>
          <Ionicons name="share-outline" size={22} color={colors.ink[900]} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: layout.screenPadding.horizontal,
    paddingBottom: spacing[3],
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: layout.touchTarget.minimum,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: spacing[2],
    marginLeft: -spacing[2],
  },
  
  // Article header
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding.horizontal,
    paddingBottom: spacing[2],
    backgroundColor: colors.background,
  },
  iconButton: {
    padding: spacing[2],
  },
});
