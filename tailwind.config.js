/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        geistSans: ['var(--font-geist-sans)', 'sans-serif'],
        geistMono: ['var(--font-geist-mono)', 'monospace'],
        karla: ['var(--font-karla)', 'sans-serif'],
        akira: ['var(--font-akira)', 'sans-serif'],
        arsenica: ['var(--font-arsenica)', 'serif'],
        'tasa-orbiter': ['var(--font-tasa-orbiter)', 'sans-serif'],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
      },
    },
  },
  plugins: [],
};
