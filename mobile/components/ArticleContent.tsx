/**
 * Article Content Renderer
 * 
 * Renders HTML content from the blog with Medium-quality typography
 */

import React from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import RenderHtml, {
  defaultSystemFonts,
  MixedStyleDeclaration,
} from 'react-native-render-html';
import { colors, typography, spacing, layout } from '@/constants/theme';
import { useDeviceInfo } from '@/lib/hooks';

interface ArticleContentProps {
  content: string;
  contentType?: 'html' | 'json';
}

// Custom fonts for HTML rendering
const systemFonts = [
  ...defaultSystemFonts,
  'Inter-Regular',
  'Inter-Medium',
  'Inter-SemiBold',
  'CrimsonPro-Regular',
  'CrimsonPro-SemiBold',
  'CrimsonPro-Italic',
  'IBMPlexMono-Regular',
];

export function ArticleContent({ content, contentType = 'html' }: ArticleContentProps) {
  const { width } = useWindowDimensions();
  const { isTablet } = useDeviceInfo();

  // Calculate content width for optimal reading
  const contentWidth = isTablet
    ? Math.min(layout.container.narrow, width - 80)
    : width - (layout.screenPadding.horizontal * 2);

  // Base styles for all text
  const baseStyle: MixedStyleDeclaration = {
    fontFamily: 'Inter-Regular',
    fontSize: isTablet ? 18 : 17,
    lineHeight: isTablet ? 32 : 28,
    color: colors.ink[700],
    letterSpacing: -0.01,
  };

  // Tag-specific styles
  const tagsStyles: Record<string, MixedStyleDeclaration> = {
    body: {
      ...baseStyle,
    },
    p: {
      marginBottom: spacing[4],
    },
    h1: {
      fontFamily: 'CrimsonPro-SemiBold',
      fontSize: isTablet ? 36 : 32,
      lineHeight: isTablet ? 44 : 40,
      color: colors.ink[900],
      letterSpacing: -0.02,
      marginTop: spacing[8],
      marginBottom: spacing[4],
    },
    h2: {
      fontFamily: 'CrimsonPro-SemiBold',
      fontSize: isTablet ? 28 : 26,
      lineHeight: isTablet ? 36 : 34,
      color: colors.ink[900],
      letterSpacing: -0.02,
      marginTop: spacing[7],
      marginBottom: spacing[3],
    },
    h3: {
      fontFamily: 'CrimsonPro-SemiBold',
      fontSize: isTablet ? 24 : 22,
      lineHeight: isTablet ? 32 : 30,
      color: colors.ink[900],
      letterSpacing: -0.01,
      marginTop: spacing[6],
      marginBottom: spacing[2],
    },
    h4: {
      fontFamily: 'Inter-SemiBold',
      fontSize: isTablet ? 20 : 18,
      lineHeight: isTablet ? 28 : 26,
      color: colors.ink[900],
      marginTop: spacing[5],
      marginBottom: spacing[2],
    },
    a: {
      color: colors.ink[900],
      textDecorationLine: 'underline',
      textDecorationColor: colors.ink[300],
    },
    strong: {
      fontFamily: 'Inter-SemiBold',
      color: colors.ink[900],
    },
    em: {
      fontFamily: 'CrimsonPro-Italic',
      fontStyle: 'italic',
    },
    blockquote: {
      borderLeftWidth: 3,
      borderLeftColor: colors.ink[200],
      paddingLeft: spacing[4],
      marginVertical: spacing[4],
      fontFamily: 'CrimsonPro-Italic',
      fontSize: isTablet ? 20 : 18,
      color: colors.ink[600],
    },
    code: {
      fontFamily: 'IBMPlexMono-Regular',
      fontSize: isTablet ? 15 : 14,
      backgroundColor: colors.ink[100],
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      color: colors.ink[800],
    },
    pre: {
      backgroundColor: colors.ink[800],
      padding: spacing[4],
      borderRadius: layout.borderRadius.md,
      marginVertical: spacing[4],
      overflow: 'hidden',
    },
    'pre > code': {
      fontFamily: 'IBMPlexMono-Regular',
      fontSize: isTablet ? 14 : 13,
      lineHeight: isTablet ? 22 : 20,
      color: colors.ink[100],
      backgroundColor: 'transparent',
      padding: 0,
    },
    ul: {
      marginBottom: spacing[4],
      paddingLeft: spacing[4],
    },
    ol: {
      marginBottom: spacing[4],
      paddingLeft: spacing[4],
    },
    li: {
      marginBottom: spacing[2],
    },
    img: {
      borderRadius: layout.borderRadius.md,
      marginVertical: spacing[4],
    },
    hr: {
      borderTopWidth: 1,
      borderTopColor: colors.ink[200],
      marginVertical: spacing[6],
    },
    table: {
      borderWidth: 1,
      borderColor: colors.ink[200],
      borderRadius: layout.borderRadius.sm,
      marginVertical: spacing[4],
    },
    th: {
      fontFamily: 'Inter-SemiBold',
      backgroundColor: colors.ink[100],
      padding: spacing[2],
      borderBottomWidth: 1,
      borderColor: colors.ink[200],
    },
    td: {
      padding: spacing[2],
      borderBottomWidth: 1,
      borderColor: colors.ink[100],
    },
  };

  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={{ html: content }}
      baseStyle={baseStyle}
      tagsStyles={tagsStyles}
      systemFonts={systemFonts}
      enableExperimentalMarginCollapsing={true}
      enableExperimentalBRCollapsing={true}
    />
  );
}
