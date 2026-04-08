/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cc-bg': '#050B12',
        'cc-surface': 'rgba(255,255,255,0.03)',
        'cc-surface2': 'rgba(255,255,255,0.06)',
        'cc-border': 'rgba(255,255,255,0.08)',
        'cc-border2': 'rgba(255,255,255,0.14)',
        'cc-cyan': '#00E5FF',
        'cc-purple': '#7C3AED',
        'cc-green': '#10B981',
        'cc-amber': '#F59E0B',
        'cc-pink': '#F72585',
        'cc-text': '#E8F4F8',
        'cc-muted': '#5A8090',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0,229,255,0.3)',
        'glow-purple': '0 0 30px rgba(124,58,237,0.3)',
        'glow-green': '0 0 30px rgba(16,185,129,0.3)',
        'glow-pink': '0 0 30px rgba(247,37,133,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #00E5FF, #7C3AED)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
