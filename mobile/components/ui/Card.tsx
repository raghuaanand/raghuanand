/**
 * Card Component
 * 
 * Clean, minimal card for content display
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, layout, shadows } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevated?: boolean;
  bordered?: boolean;
}

export function Card({
  children,
  style,
  onPress,
  elevated = false,
  bordered = true,
}: CardProps) {
  const cardStyles = [
    styles.base,
    bordered && styles.bordered,
    elevated && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          ...cardStyles,
          pressed && styles.pressed,
        ]}
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing[4],
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    ...shadows.mid,
    borderWidth: 0,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
});
