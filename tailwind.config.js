/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        border: 'var(--border)',
        border2: 'var(--border2)',
        cyan: 'var(--cyan)',
        purple: 'var(--purple)',
        green: 'var(--green)',
        amber: 'var(--amber)',
        pink: 'var(--pink)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
}
