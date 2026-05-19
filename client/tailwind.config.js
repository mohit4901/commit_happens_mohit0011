/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vulnmap-dark': '#050505',
        'vulnmap-card': '#0a0a0a',
        'vulnmap-border': '#1F2937',
        'brand-green': '#00FF41',
        'risk-critical': '#DC2626',
        'risk-high': '#F97316',
        'risk-medium': '#EAB308',
        'risk-low': '#22C55E',
        'risk-safe': '#6B7280'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
