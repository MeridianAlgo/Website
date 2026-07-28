/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ledger paper palette. Named for the artifact, not for a UI role.
        paper: '#eff1e9',   // page — pale sage-white newsprint
        sheet: '#f8f9f4',   // raised sheet, near white
        band: '#dfe7d8',    // the green bar on columnar accounting pads
        rule: '#c3c9ba',    // hairline rule
        steel: '#35494e',   // blue-slate — secondary text, heavy rules
        ink: '#171b14',     // text
        stamp: '#b5321f',   // margin rule, negatives, active state
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        sheet: '76rem',
        column: '38rem',
      },
      keyframes: {
        'ledger-line': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'ledger-line': 'ledger-line 380ms cubic-bezier(0.2, 0.7, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
