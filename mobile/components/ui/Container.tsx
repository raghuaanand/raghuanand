/**
 * Container Component
 * 
 * Consistent content containers with safe area support
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout, spacing } from '@/constants/theme';
import { useDeviceInfo } from '@/lib/hooks';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  padded?: boolean;
  narrow?: boolean;
  safeArea?: boolean | 'top' | 'bottom' | 'horizontal';
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function Container({
  children,
  style,
  scrollable = false,
  padded = true,
  narrow = false,
  safeArea = true,
  refreshing = false,
  onRefresh,
}: ContainerProps) {
  const insets = useSafeAreaInsets();
  const { isTablet } = useDeviceInfo();

  const getSafeAreaPadding = (): ViewStyle => {
    if (!safeArea) return {};
    
    if (safeArea === true) {
      return {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      };
    }
    
    if (safeArea === 'top') return { paddingTop: insets.top };
    if (safeArea === 'bottom') return { paddingBottom: insets.bottom };
    if (safeArea === 'horizontal') {
      return { paddingLeft: insets.left, paddingRight: insets.right };
    }
    
    return {};
  };

  const containerStyle: ViewStyle[] = [
    styles.base,
    getSafeAreaPadding(),
    padded && styles.padded,
    narrow && styles.narrow,
    isTablet && styles.tablet,
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scrollBase}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.ink[400]}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

/**
 * Screen wrapper with default background
 */
export function Screen({
  children,
  style,
  ...props
}: ContainerProps) {
  return (
    <View style={[styles.screen, style]}>
      <Container {...props}>{children}</Container>
    </View>
  );
}

/**
 * Reading container optimized for article content
 */
export function ReadingContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { isTablet, width } = useDeviceInfo();
  
  const readingWidth = isTablet 
    ? Math.min(layout.container.narrow, width - 80)
    : '100%';

  return (
    <View style={[styles.reading, { maxWidth: readingWidth }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBase: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  narrow: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
  },
  tablet: {
    paddingHorizontal: spacing[10],
  },
  reading: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: layout.screenPadding.horizontal,
  },
});
