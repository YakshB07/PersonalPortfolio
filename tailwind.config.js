/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F4F1EA', deep: '#EAE5DA' },
        ink: { DEFAULT: '#17150F', soft: '#4F4A42', faint: '#5E584E' },
        rule: '#CDC5B6',
        // Safety orange. `accent` for large figures/fills, `accent-ink` for text & buttons (AA on paper).
        accent: { DEFAULT: '#E8590C', ink: '#B23A06' },
      },
      fontFamily: {
        sans: ['"Space Grotesk Variable"', '"Space Grotesk"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { sheet: '76rem' },
    },
  },
  plugins: [],
};
