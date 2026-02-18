/**
 * Divider Component
 * 
 * Simple horizontal or vertical divider
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/theme';

interface DividerProps {
  style?: ViewStyle;
  vertical?: boolean;
  spacing?: keyof typeof spacingOptions;
}

const spacingOptions = {
  none: 0,
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
} as const;

export function Divider({
  style,
  vertical = false,
  spacing: spacingProp = 'md',
}: DividerProps) {
  const marginValue = spacingOptions[spacingProp];

  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        vertical 
          ? { marginHorizontal: marginValue }
          : { marginVertical: marginValue },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  vertical: {
    width: 1,
    backgroundColor: colors.border,
    height: '100%',
  },
});
