/**
 * Typography Components
 * 
 * Consistent text styling matching the web design system
 */

import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, TextProps as RNTextProps } from 'react-native';
import { colors, typography } from '@/constants/theme';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  color?: keyof typeof colors.ink | 'accent' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
}

const variants = {
  // Display headings (Crimson Pro)
  h1: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['5xl'].size,
    lineHeight: typography.fontSize['5xl'].lineHeight,
    letterSpacing: typography.letterSpacing.tighter,
    color: colors.ink[900],
  },
  h2: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['4xl'].size,
    lineHeight: typography.fontSize['4xl'].lineHeight,
    letterSpacing: typography.letterSpacing.tighter,
    color: colors.ink[900],
  },
  h3: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['3xl'].size,
    lineHeight: typography.fontSize['3xl'].lineHeight,
    letterSpacing: typography.letterSpacing.tight,
    color: colors.ink[900],
  },
  h4: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['2xl'].size,
    lineHeight: typography.fontSize['2xl'].lineHeight,
    letterSpacing: typography.letterSpacing.tight,
    color: colors.ink[900],
  },
  h5: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.xl.size,
    lineHeight: typography.fontSize.xl.lineHeight,
    color: colors.ink[900],
  },
  
  // Body text (Inter)
  body: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.base.size,
    lineHeight: typography.fontSize.base.lineHeight,
    color: colors.ink[700],
  },
  bodyLarge: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.lg.size,
    lineHeight: typography.fontSize.lg.lineHeight,
    color: colors.ink[700],
  },
  bodySmall: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm.size,
    lineHeight: typography.fontSize.sm.lineHeight,
    color: colors.ink[600],
  },
  
  // UI text
  label: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.sm.size,
    lineHeight: typography.fontSize.sm.lineHeight,
    color: colors.ink[900],
  },
  caption: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xs.size,
    lineHeight: typography.fontSize.xs.lineHeight,
    color: colors.ink[500],
  },
  
  // Monospace label
  mono: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.xs.size,
    lineHeight: typography.fontSize.xs.lineHeight,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
    color: colors.ink[500],
  },
} as const;

function getColor(colorKey?: TextProps['color']): string {
  if (!colorKey) return colors.ink[900];
  if (colorKey === 'accent') return colors.accent.DEFAULT;
  if (colorKey === 'error') return colors.error;
  if (colorKey === 'success') return colors.success;
  return colors.ink[colorKey] || colors.ink[900];
}

export function Text({ 
  children, 
  variant = 'body', 
  color, 
  align = 'left',
  style, 
  ...props 
}: TextProps) {
  const variantStyle = variants[variant];
  
  return (
    <RNText
      style={[
        variantStyle,
        color && { color: getColor(color) },
        { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Convenience exports
export function Heading({ level = 1, ...props }: TextProps & { level?: 1 | 2 | 3 | 4 | 5 }) {
  const variant = `h${level}` as keyof typeof variants;
  return <Text variant={variant} {...props} />;
}

export function Paragraph(props: TextProps) {
  return <Text variant="bodyLarge" {...props} />;
}

export function Caption(props: TextProps) {
  return <Text variant="caption" {...props} />;
}

export function Label(props: TextProps) {
  return <Text variant="mono" {...props} />;
}
