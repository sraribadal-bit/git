import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F4F7",
        charcoal: {
          DEFAULT: "#09090B",
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        electric: {
          indigo: "#6366F1",
          hover: "#4F46E5",
          light: "#EEF2FF",
        },
        hot: {
          rose: "#EC4899",
          hover: "#DB2777",
          light: "#FDF2F8",
        },
        mint: {
          DEFAULT: "#10B981",
          hover: "#059669",
          light: "#ECFDF5",
        }
      },
      borderRadius: {
        '24px': '24px',
        '28px': '28px',
        '32px': '32px',
      },
      boxShadow: {
        'bento': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 10px 24px -4px rgba(0, 0, 0, 0.04)',
        'bento-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 20px 32px -6px rgba(99, 102, 241, 0.12)',
        'glow-indigo': '0 0 25px -3px rgba(99, 102, 241, 0.35)',
        'glow-rose': '0 0 25px -3px rgba(236, 72, 153, 0.35)',
        'glow-mint': '0 0 25px -3px rgba(16, 185, 129, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
