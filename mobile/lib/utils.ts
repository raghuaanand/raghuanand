/**
 * Utility Functions
 * 
 * Common helpers shared across the mobile app
 */

import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Responsive sizing utilities
 */

// Base design width (iPhone 14 Pro)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Scale a value based on screen width
 */
export function wp(widthPercent: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * widthPercent) / 100);
}

/**
 * Scale a value based on screen height
 */
export function hp(heightPercent: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * heightPercent) / 100);
}

/**
 * Scale font size responsively
 */
export function scaleFontSize(size: number): number {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

/**
 * Check if device is a tablet
 */
export function isTablet(): boolean {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  // Tablets typically have aspect ratio < 1.6
  return aspectRatio < 1.6 && SCREEN_WIDTH >= 600;
}

/**
 * Get optimal reading line length
 */
export function getReadingWidth(): number {
  if (isTablet()) {
    return Math.min(680, SCREEN_WIDTH - 80); // Max 680 like web
  }
  return SCREEN_WIDTH - 40; // Full width with padding on phones
}

/**
 * Date formatting
 */

export function formatDate(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return format(parsed, 'MMM d, yyyy');
}

export function formatDateShort(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return format(parsed, 'MMM d');
}

export function formatDateRelative(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsed, { addSuffix: true });
}

/**
 * Text utilities
 */

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '…')
    .trim();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…';
}

/**
 * Slugify text
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate excerpt from HTML content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = stripHtml(content);
  return truncateText(plainText, maxLength);
}

/**
 * Estimate reading time
 */
export function getReadingTime(content: string): string {
  const plainText = stripHtml(content);
  const wordsPerMinute = 200;
  const words = plainText.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Platform helpers
 */

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export { SCREEN_WIDTH, SCREEN_HEIGHT };
