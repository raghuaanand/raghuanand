/**
 * Button Component
 * 
 * Accessible, touch-friendly button with variants
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  PressableProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, layout, typography } from '@/constants/theme';
import { Text } from './Text';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  ...props
}: ButtonProps) {
  const handlePress = async (event: any) => {
    if (!disabled && !loading) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress?.(event);
    }
  };

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textColor = variant === 'primary' ? 'white' : 'ink900';
  const textVariant = size === 'sm' ? 'bodySmall' : 'label';

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.ink[50] : colors.ink[900]}
        />
      ) : (
        <Text
          variant={textVariant}
          style={[
            styles.text,
            variant === 'primary' && styles.textPrimary,
            variant === 'link' && styles.textLink,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.borderRadius.md,
    minHeight: layout.touchTarget.minimum,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.ink[900],
  },
  secondary: {
    backgroundColor: colors.ink[50],
    borderWidth: 1,
    borderColor: colors.ink[200],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    minHeight: 'auto' as any,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  
  // Sizes
  size_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  size_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  size_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  // Text
  text: {
    color: colors.ink[900],
  },
  textPrimary: {
    color: colors.ink[50],
  },
  textLink: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.ink[300],
  },
});
