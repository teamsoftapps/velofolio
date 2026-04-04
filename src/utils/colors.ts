/** 
 * Extended Application Color Palette
 * Contains the complete generalized extraction of hex codes across all platform modules 
 * (Dashboard, Leads, Jobs, Calendar, Teams, Payments, Reports, Settings).
 */

export const colors = {
  // Brand & Primary Blues (Main CTA & Highlights)
  primary: '#01B0E9',
  primaryHover: '#00A4DD',
  primaryFocus: '#01A0D9',
  primaryDeep: '#0198C7',
  primaryDark: '#008AC0',
  primaryDarker: '#0088B8',
  primaryLight: '#33BFEC',
  primaryLighter: '#34C0EE',
  primaryBorder: '#2AA8D6',
  skyBlue: '#E0F2FE',
  skyBlueLight: '#E0F7FF',
  skySky: '#E2F5FE',
  skyDark: '#0284C7',

  // Social & Platform Blues
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',

  // Status Colors (Success / Green)
  success: '#10B981',
  successLight: '#DCFCE7',
  successBright: '#22C55E',
  successDark: '#15803D',
  successDeep: '#0B763E',
  accentGreen: '#14CB95',
  kanbanGreen: '#13CC95',
  mutedGreen: '#90C0A4',
  googleGreen: '#34A853',
  darkGreen: '#0E7D4B',

  // Status Colors (Warning / Orange & Yellow)
  warning: '#FBBF24',
  warningDark: '#D97706',
  warningDeep: '#CA8A04',
  warningBright: '#FFC700',
  warningLight: '#FFF9E5',
  kanbanOrange: '#F7631C',
  mutedOrange: '#D66C55',
  baseOrange: '#FF9800',

  // Status Colors (Danger / Red & Pinks)
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  dangerBright: '#F0666F',
  dangerDark: '#EB6969',
  dangerSolid: '#FF4D4D',
  accentPink: '#EC4899',
  kanbanRed: '#FF5733',
  kanbanPink: '#E84393',
  kanbanPurple: '#9B59B6',
  instagram: '#E4405F',
  youtube: '#EA4335',

  // Monochromes / Neutrals (Black -> White)
  black: '#000000',
  blackSoft: '#111827',
  gray900: '#1F2937',
  gray800: '#374151',
  gray700: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  grayMid: '#8C8C8C',
  grayNeutral: '#919191',
  graySolid: '#818181',
  grayDisabled: '#D1D3D6',
  grayBorder: '#DDD',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  white: '#FFFFFF',

  // App Backgrounds (Light & Wash Tones)
  bgLight: '#FAFAFA',
  bgSoft: '#F8F9FB',
  bgSlate: '#F8FAFC',
  zinc100: '#F4F4F5',
  bgDash: '#F1F3F9',
  bgWarm: '#FFF8E9',
};

/**
 * Common usage mappings
 */
export const themeMappings = {
  background: colors.bgLight,
  text: colors.gray500,
  border: colors.gray200,
  active: colors.primary,
};
