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
        serif: ["Crimson Text", "Georgia", "Cambria", "Times New Roman", "serif"], // Classic serif for headings
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"], // Clean sans-serif for body
        mono: ["Monaco", "Consolas", "Liberation Mono", "monospace"],
        // Keep existing for backward compatibility
        bodyFont: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        titleFont: ["Crimson Text", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        navbarBoxShadow: "0 10px 30px -10px rgba(2,12,27,0.7)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        cardHover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      fontSize: {
        // Classic typographic scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px base
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // H2: 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // H1: 36px
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        // Consistent spacing scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      colors: {
        // Classic navy blue and neutral palette
        primary: "#1a365d", // Deep navy blue
        secondary: "#2d3748", // Charcoal gray
        accent: "#3182ce", // Professional blue accent
        background: "#f7fafc", // Off-white background
        surface: "#ffffff", // Pure white for cards/sections
        text: {
          primary: "#2d3748", // Dark charcoal for main text
          secondary: "#4a5568", // Medium gray for secondary text
          muted: "#718096", // Light gray for muted text
        },
        border: "#e2e8f0", // Light border color
        hover: "rgba(49, 130, 206, 0.1)", // Subtle blue hover
        // Keep some existing colors for backward compatibility
        bodyColor: "#f7fafc",
        secondaryColor: "#ffffff",
        textGreen: "#3182ce",
        textLight: "#2d3748",
        textDark: "#4a5568",
        hoverColor: "rgba(49, 130, 206, 0.1)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
