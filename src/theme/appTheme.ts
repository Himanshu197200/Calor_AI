export const Colors = {
  bgPrimary: '#0A0A0A',
  bgSecondary: '#111111',
  bgCard: 'rgba(255, 255, 255, 0.07)',
  bgCardSolid: 'rgba(22, 22, 24, 0.92)',

  borderGlass: 'rgba(255, 255, 255, 0.12)',
  borderGlassStrong: 'rgba(255, 255, 255, 0.20)',

  accent: '#4ADE80',
  accentDark: '#22C55E',
  accentGlow: 'rgba(74, 222, 128, 0.15)',

  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',

  like: '#4ADE80',
  likeGlow: 'rgba(74, 222, 128, 0.3)',
  dislike: '#EF4444',
  dislikeGlow: 'rgba(239, 68, 68, 0.3)',
  superlike: '#818CF8',
  superlikeGlow: 'rgba(129, 140, 248, 0.3)',
  unsure: '#9CA3AF',

  navBg: 'rgba(18, 18, 20, 0.88)',
  navBorder: 'rgba(255, 255, 255, 0.08)',
  navActive: '#4ADE80',
  navInactive: '#6B7280',

  progressBg: 'rgba(255, 255, 255, 0.1)',
  progressFill: '#4ADE80',

  gradientTop: '#0A0A0A',
  gradientBottom: '#18181A',

  blobGreen: 'rgba(34, 197, 94, 0.12)',
  blobBlue: 'rgba(59, 130, 246, 0.08)',
};

import { Platform } from 'react-native';

export const Typography = {
  fontFamily: Platform.select({
    ios: 'System',
    web: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'Roboto',
  }),
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,

  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Glass = {
  blurIntensity: 25,
  blurTint: 'dark' as const,
  overlayOpacity: 0.07,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.12)',
};

export const Swipe = {
  threshold: 80,
  velocityThreshold: 500,
  stackSize: 3,
  cardRotationMax: 12,
};
