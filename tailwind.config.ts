import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        'elevation-low': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'elevation-mid': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevation-high': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      colors: {
        // Strict High Contrast - Arpit Bhayani Style
        ink: {
          900: '#000000', // Pure Black
          800: '#1a1a1a',
          700: '#333333',
          600: '#4d4d4d',
          500: '#666666',
          400: '#808080',
          300: '#999999',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50: '#ffffff', // Pure White
        },
        // Single Accent Color - Refined Rust (Keeping as per user constraint)
        accent: {
          DEFAULT: '#c2410c',
          light: '#ea580c',
          dark: '#9a3412',
        },
        // Semantic aliases
        background: '#ffffff',
        surface: '#ffffff',
        border: '#e5e5e5',
        text: {
          primary: '#000000',
          secondary: '#4d4d4d',
          tertiary: '#808080',
        },
      },
      backgroundImage: {
        // No gradients allowed
      },
    },
  },
  plugins: [],
};
export default config;
