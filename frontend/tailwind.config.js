/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-dim': '#0f131c',
        'primary': '#4cd7f6',
        'secondary': '#7bd0ff',
        'tertiary': '#b4c5ff',
        'background': '#0f131c',
        'surface-container-lowest': '#0a0e17',
        'surface-container-low': '#181b25',
        'surface-container': '#1c1f29',
        'surface-container-high': '#262a34',
        'surface-container-highest': '#31353f',
        'on-surface': '#dfe2ef',
        'on-surface-variant': '#bcc9cd',
        'outline': '#869397',
        'outline-variant': '#3d494c',
        'error': '#ffb4ab',
        'primary-fixed': '#acedff',
        'secondary-container': '#00a6e0'
      },
      borderRadius: { DEFAULT: '0.125rem', lg: '0.25rem', xl: '0.5rem', full: '0.75rem' },
      spacing: { gutter: '1.5rem', 'container-max': '1200px' },
      fontFamily: {
        headline: ['Geist'],
        display: ['Geist'],
        body: ['Inter'],
        code: ['JetBrains Mono']
      }
    }
  },
  plugins: []
};
