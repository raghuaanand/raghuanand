/**
 * Chip Component
 * 
 * Small label/tag component
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, layout } from '@/constants/theme';
import { Text } from './Text';

interface ChipProps {
  children: string;
  variant?: 'default' | 'success' | 'warning' | 'accent';
  style?: ViewStyle;
}

export function Chip({
  children,
  variant = 'default',
  style,
}: ChipProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text variant="caption" style={styles[`${variant}Text`]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    borderRadius: layout.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  
  // Variants
  default: {
    backgroundColor: colors.ink[100],
    borderWidth: 1,
    borderColor: colors.ink[200],
  },
  success: {
    backgroundColor: '#dcfce7', // green-100
    borderWidth: 1,
    borderColor: '#bbf7d0', // green-200
  },
  warning: {
    backgroundColor: '#fef3c7', // amber-100
    borderWidth: 1,
    borderColor: '#fde68a', // amber-200
  },
  accent: {
    backgroundColor: '#fff7ed', // orange-50
    borderWidth: 1,
    borderColor: '#fed7aa', // orange-200
  },
  
  // Text colors
  defaultText: {
    color: colors.ink[600],
  },
  successText: {
    color: '#166534', // green-800
  },
  warningText: {
    color: '#92400e', // amber-800
  },
  accentText: {
    color: colors.accent.dark,
  },
});
