import { colors, spacing, typography, radii, shadows, zIndex, breakpoints } from './tokens';

/**
 * GrowEase Theme Interface
 * Defines the structure for the design system theme
 */
export interface GrowEaseTheme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  radii: typeof radii;
  shadows: typeof shadows;
  zIndex: typeof zIndex;
  breakpoints: typeof breakpoints;
}

/**
 * Default GrowEase theme
 * This is a minimal, clean base that can be extended for gamification later
 */
export const defaultTheme: GrowEaseTheme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  zIndex,
  breakpoints,
};

/**
 * Component style helpers
 */
export const componentStyles = {
  button: {
    primary: {
      base: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
    },
    secondary: {
      base: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
    },
    outline: {
      base: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      disabled: 'border-gray-200 text-gray-400 cursor-not-allowed',
    },
  },
  card: {
    base: 'bg-white rounded-lg shadow-base border border-gray-200 p-6',
    elevated: 'bg-white rounded-lg shadow-lg border border-gray-200 p-6',
  },
} as const;

