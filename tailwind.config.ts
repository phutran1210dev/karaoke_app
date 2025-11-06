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
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        pastel: {
          pink: '#f8d7da',
          lavender: '#e7d4f0',
          mint: '#d1ecf1',
          peach: '#f5deb3',
          cream: '#fef7e0',
          rose: '#fce4ec',
          baby: '#f3e5f5',
        },
        karaoke: {
          bg: '#fdf2f8',
          card: '#ffffff',
          accent: '#f472b6',
          text: '#1f2937',
          muted: '#6b7280',
        }
      },
      fontFamily: {
        'kawaii': ['Comic Neue', 'cursive'],
        'cute': ['Quicksand', 'sans-serif'],
      },
      animation: {
        'bounce-cute': 'bounce 1s infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'dance': 'dance 2s ease-in-out infinite',
        'heart-beat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dance: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '75%': { transform: 'translateX(5px) rotate(2deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      },
      backgroundImage: {
        'gradient-cute': 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
        'gradient-karaoke': 'linear-gradient(45deg, #f8d7da 0%, #e7d4f0 100%)',
      }
    },
  },
  plugins: [],
};

export default config;