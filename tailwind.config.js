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
      colors: {
        'gmc-teal': {
          dark: '#245760',
          DEFAULT: '#3A7D8D',
          light: '#73b3b6'
        },
        'gmc-orange': {
          dark: '#E97851',
          DEFAULT: '#F3AD64'
        },
        'gmc-cream': '#EDEBD8'
      }
    },
  },
  plugins: [],
};
