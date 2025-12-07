import type { Config } from 'tailwindcss';
import { colors, spacing, typography, radii, shadows, breakpoints } from '@growease/design/src/tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      borderRadius: radii,
      boxShadow: shadows,
      screens: breakpoints,
    },
  },
  plugins: [],
};

export default config;

