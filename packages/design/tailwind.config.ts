import type { Config } from 'tailwindcss';
import { colors, spacing, typography, radii, shadows, breakpoints } from './src/tokens';

const config: Config = {
  content: [],
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

