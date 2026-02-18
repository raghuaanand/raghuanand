/**
 * Design Tokens - Mirrored from web Tailwind config
 * 
 * These tokens maintain exact parity with the web design system
 * to ensure a cohesive product experience across platforms.
 */

// Color Palette - Strict High Contrast (matches web)
export const colors = {
  // Ink scale - Primary text and UI colors
  ink: {
    900: '#000000', // Pure Black - Primary text
    800: '#1a1a1a',
    700: '#333333', // Body text
    600: '#4d4d4d', // Secondary text
    500: '#666666',
    400: '#808080', // Tertiary text
    300: '#999999',
    200: '#e5e5e5', // Borders
    100: '#f5f5f5', // Subtle backgrounds
    50: '#ffffff',  // Pure White
  },
  
  // Accent - Single refined rust color
  accent: {
    DEFAULT: '#c2410c',
    light: '#ea580c',
    dark: '#9a3412',
  },
  
  // Semantic colors
  background: '#ffffff',
  surface: '#ffffff',
  border: '#e5e5e5',
  
  // Status colors (used sparingly)
  success: '#16a34a',
  error: '#dc2626',
} as const;

// Typography - Matching web font system
export const typography = {
  // Font families (loaded via expo-font)
  fontFamily: {
    display: 'CrimsonPro-SemiBold',
    displayRegular: 'CrimsonPro-Regular',
    displayItalic: 'CrimsonPro-Italic',
    body: 'Inter-Regular',
    bodyMedium: 'Inter-Medium',
    bodySemiBold: 'Inter-SemiBold',
    mono: 'IBMPlexMono-Regular',
  },
  
  // Font sizes with line heights (mobile-optimized)
  fontSize: {
    xs: { size: 12, lineHeight: 16 },
    sm: { size: 14, lineHeight: 20 },
    base: { size: 16, lineHeight: 24 },
    lg: { size: 18, lineHeight: 28 },
    xl: { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 40 },
    '5xl': { size: 48, lineHeight: 48 },
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.02,
    tight: -0.01,
    normal: 0,
    wide: 0.05,
  },
} as const;

// Spacing scale (matches Tailwind's default + custom)
export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  22: 88,
  24: 96,
} as const;

// Layout constants
export const layout = {
  // Content container max widths
  container: {
    narrow: 680,    // Optimal reading width (matches web)
    default: 1280,  // Standard container
  },
  
  // Safe area padding
  screenPadding: {
    horizontal: 20,
    vertical: 16,
  },
  
  // Touch target minimums (accessibility)
  touchTarget: {
    minimum: 44,    // Apple HIG minimum
    comfortable: 48,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
} as const;

// Shadows (native elevation equivalents)
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  low: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  mid: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  high: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 25,
    elevation: 8,
  },
} as const;

// Animation timing (subtle, native-feeling)
export const animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
  easing: {
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Export combined theme object
export const theme = {
  colors,
  typography,
  spacing,
  layout,
  shadows,
  animation,
} as const;

export type Theme = typeof theme;
export default theme;
