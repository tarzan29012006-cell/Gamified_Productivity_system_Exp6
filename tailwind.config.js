/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prodigy: {
          darkest: '#0b0818',
          bg: '#0f0b21',
          card: '#161132',
          cardHover: '#1c1640',
          border: '#2a2055',
          borderLight: '#382b70',
          purple: '#7c3aed',
          purpleDark: '#581c87',
          purpleLight: '#9333ea',
          purpleGlow: '#a855f7',
          textMuted: '#908aa0',
          textSub: '#b3aed0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'glow-purple-sm': '0 0 15px -3px rgba(168, 85, 247, 0.3)',
        'glow-green': '0 0 20px -4px rgba(34, 197, 94, 0.35)',
        'glow-orange': '0 0 20px -4px rgba(249, 115, 22, 0.35)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(168, 85, 247, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
