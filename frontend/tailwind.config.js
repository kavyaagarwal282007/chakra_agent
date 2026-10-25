/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#020617', // Canvas Base
          900: '#070d1f', // surface_container_lowest
          850: '#0c1324', // surface
          800: '#0f172a', // Surface Level 1 (Docked Panels)
          750: '#151b2d', // surface_container_low
          700: '#191f31', // surface_container
          650: '#1e293b', // Surface Level 2 (Cards & Nodes)
          600: '#23293c', // surface_container_high
          500: '#334155', // Active Surface / Dividers
          400: '#64748b',
          300: '#94a3b8',
          100: '#dce1fb',
          50: '#f8fafc',
        },
        cyber: {
          emerald: '#10b981',
          'emerald-glow': '#4edea3',
          cyan: '#06b6d4',
          'cyan-glow': '#4cd7f6',
          indigo: '#6366f1',
          'indigo-glow': '#a5b4fc',
          amber: '#f59e0b',
          rose: '#f43f5e',
          'rose-glow': '#fb7185',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'Consolas'],
      },
      boxShadow: {
        'glow-emerald': '0 0 16px -2px rgba(16, 185, 129, 0.35)',
        'glow-cyan': '0 0 16px -2px rgba(6, 182, 212, 0.35)',
        'glow-indigo': '0 0 16px -2px rgba(99, 102, 241, 0.35)',
        'glow-amber': '0 0 16px -2px rgba(245, 158, 11, 0.35)',
        'glow-rose': '0 0 16px -2px rgba(244, 63, 94, 0.4)',
        'glow-card': '0 8px 32px -4px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
