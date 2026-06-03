/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#f9edd8',
          200: '#f2d9b0',
          300: '#e8c080',
          400: '#dca050',
          500: '#c8842a',
          600: '#a86820',
          700: '#865018',
          800: '#663c14',
          900: '#4a2c10',
          950: '#2e1a08',
        },
        ember: {
          400: '#e07040',
          500: '#c05830',
          600: '#9e4020',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],
        karla: ['Karla', 'sans-serif'],
      },
    },
  },
  plugins: [],
};