/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DEDBC8', // Champagne Gold
          text: '#A8A695', // Muted Sage
        },
        gold: {
          champagne: '#DEDBC8',
          brand: '#d4af37',
        },
        emerald: {
          velvet: '#061a10', // Velvet Emerald Base
          dark: '#0b291a', // Dark Emerald backing / borders
        },
        sage: {
          muted: '#A8A695', // Muted Sage body / descriptions
        },
        luxury: {
          bg: '#061a10', // Velvet Emerald Base
          aboutBg: '#0b291a', // Dark Emerald backing
          featureBg: '#0b291a', // Dark Emerald panel border-compatible
        }
      },
      fontFamily: {
        sans: ['Inter', 'Almarai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'luxury-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
